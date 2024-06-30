import { useEffect, useState } from "react";
import LayoutComponent from "../../components/Layout";
import { useGetRecentArticlesQuery } from "../../services/ArticlesServices/articleService";
import { useGetTagsQuery } from "../../services/TageServices/TageService";
import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from "../../services/FavoritesAService/FavoritesServices";
import { NavLink, Outlet, useMatch } from "react-router-dom";
import { useGetProfileQuery } from "../../services/ProfileServices/ProfileService";
import { setUserProfile } from "../../features/auth/UserSlice";
import { useAppDispatch } from "../../app/hook";

const HomePage = () => {


  const dispatch = useAppDispatch();
  const totalPages = 10
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1); // Start from page 1
  const limit = 5; // Number of articles per page

  const { data: tags, error: tagsError, isLoading: tagsLoading } = useGetTagsQuery();

  // Calculate offset based on currentPage and limit
  const offset = (currentPage - 1) * limit;


  // Fetch articles based on the selected tag and the current page
  const { data: articlesResponse, error: articlesError, isLoading: articlesLoading, refetch } = useGetRecentArticlesQuery({
    tag: selectedTag,
    offset,
    limit,
  });



  // Extract the author's username from the article data
  const username = articlesResponse?.articles[0]?.author.username;
  console.log("username", username);



  //  Get the profile data for the currently selected author.
  const { data: profileData } = useGetProfileQuery<any>(username ?? '');



  
  /**
   * Dispatches the user profile data to the Redux store when the profile data is available.
   *
   * This effect is used to update the user profile in the Redux store whenever the profile data is fetched and available. It ensures that the user's profile information is kept up-to-date in the application state.
   *
   * @param dispatch - The Redux dispatch function used to update the user profile in the store.
   * @param profileData - The user profile data fetched from the API.
   */
  useEffect(() => {
    if (profileData) {
      dispatch(setUserProfile(profileData));
    }
  }, [dispatch, profileData]);


  // Favorite article mutation
  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();

  

  /**
   * Refetches the recent articles based on the current page and selected tag.
   *
   * This effect is used to update the list of articles whenever the current page or selected tag changes. It ensures that the user sees the correct set of articles based on their current selection.
   *
   * @param currentPage - The current page number.
   * @param selectedTag - The currently selected tag.
   * @param refetch - The refetch function provided by the useGetRecentArticlesQuery hook.
   */
  useEffect(() => {
    refetch(); 
  }, [currentPage, selectedTag, refetch]);
  
 // Handle favorite toggle
  /**
   * Toggles the favorite status of an article.
   *
   * @param slug - The slug of the article to toggle the favorite status for.
   * @param isFavorited - A boolean indicating whether the article is currently favorited.
   * @returns A Promise that resolves when the favorite status has been toggled.
   */
  const handleFavoriteToggle = async (slug: string, isFavorited: boolean) => {
    try {
      if (isFavorited) {
        await unfavoriteArticle(slug);
      } else {
        await favoriteArticle(slug);
      }
      refetch();
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };



  /**
   * Handles the click event on a tag in the tag list.
   *
   * @param tag - The tag that was clicked.
   * @returns void
   */
  const handleTagClick = (tag: string) => {
      setSelectedTag(tag);
      setCurrentPage(1);
  };


  // handle page click
  const isYourFeed = useMatch("/your-feed");


  return (
    <LayoutComponent>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <NavLink to="/" end className="nav-link"   >Global Feed</NavLink>
                  </li>
                  <li>
                    <NavLink to="/your-feed" className=" nav-link">Your Feed</NavLink>
                  </li>
                </ul>

              </div>

              {!isYourFeed && (
                <>


                </>
              )}


              {/*  show the articles  */}
              {articlesLoading && <div>Loading articles...</div>}
              {articlesError && <div>Error fetching articles</div>}
              {articlesResponse?.articles && articlesResponse.articles.map((article) => (
                <div className="article-preview" key={article.slug}>
                  <div className="article-meta">
                    <a href={`/profile/${article.author.username}`}><img src={article.author.image} alt={article.author.username} /></a>
                    <div className="info">
                      <a href={`/profile/${article.author.username}`} className="author">{article.author.username}</a>
                      <span className="date">{article.createdAt}</span>
                    </div>
                    <button
                      className="btn btn-outline-primary btn-sm pull-xs-right"
                      onClick={() => handleFavoriteToggle(article.slug, article.favorited)}>
                      <i className="ion-heart"></i> {article.favoritesCount}
                    </button>
                  </div>
                  <a href={`/article/${article.slug}`} className="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                    <ul className="tag-list">
                      {article.tagList.map((tag) => (
                        <li key={`${article.slug}-${tag}`} className="tag-default tag-pill tag-outline">{tag}</li>
                      ))}
                    </ul>
                  </a>
                </div>
              ))}


              {/*  Showing pagination  */}
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
                  <button className="page-link">Previous</button>
                </li>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <li key={`page-${index}`} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>
                  <button className="page-link">Next</button>
                </li>
              </ul>


            </div>


            {/*  show the tags  */}
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                {tagsLoading && <div>Loading tags...</div>}
                {tagsError && <div>Error fetching tags</div>}
                {Array.isArray(tags) ? tags.map((tag, index) => (
                  <button
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    key={index} className="tag-pill tag-default">
                    {tag}
                  </button>
                )) : <div>No tags found</div>}
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>

    </LayoutComponent>
  )
}

export default HomePage
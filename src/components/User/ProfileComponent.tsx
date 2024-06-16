import { useParams } from "react-router-dom";
import { useGetProfileQuery } from "../../services/Profile/ProfileService";
import { useAppSelector } from "../../app/hook";
import { useGetArticlesFeedQuery } from "../../services/Articles/articleService";


const ProfileComponent = () => {

  let { username } = useParams();
  const safeusername  = username  ?? '';
   // Fetch user profile
   const { data: userProfile } = useGetProfileQuery( safeusername);


     // Fetch articles feed
  const { data: articlesFeed, isError:articlesError , isLoading: isArticlesFeedLoading } = useGetArticlesFeedQuery(); 


  // Access the current user's token from the global state.
   const { token } = useAppSelector((state) => state.user);


  return (
    <div className="profile-page">
  <div className="user-info">
    <div className="container">
      <div className="row">
        <div className="col-xs-12  col-md-10 offset-md-1">
          <img src={userProfile?.profile?.image} className="user-img" />
          <h4> {userProfile?.profile.username} </h4>
          <p>
            {
              userProfile?.profile.bio
            }
          </p>
          <button className="btn btn-sm btn-outline-secondary action-btn">
            <i className="ion-plus-round"></i>
            &nbsp; Follow {userProfile?.profile.username}
          </button>

        {/*  when there's no token it means user is not login do not show this button */}

    {token ? (
      <button className="btn btn-sm btn-outline-secondary action-btn">
    <i className="ion-heart"></i>&nbsp; Favorite {userProfile?.profile.username}
    </button>
) : null}
        </div>
      </div>
    </div>
  </div>


{/*  USER actives  */}
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-md-10 offset-md-1">
        <div className="articles-toggle">
          <ul className="nav nav-pills outline-active">
            <li className="nav-item">
              <a className="nav-link active" href="">My Articles</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">Favorited Articles</a>
            </li>
          </ul>
        </div>
 
     {/*  Articles for the user   */} 
       
         {isArticlesFeedLoading&& <div>Loading articles...</div>}
              {articlesError && <div>Error fetching articles</div>}
              {articlesFeed && typeof articlesFeed === 'object' && Object.entries(articlesFeed).map(([key, value], index) => {
                if (Array.isArray(value)) {
                  return value.map((article, articleIndex) => (
                    <div className="article-preview" key={`${key}-${articleIndex}`}>
                      <div className="article-meta">


                        {/*  show the image of the user  */}
                        <a href={`/profile/${article.author.username}`}><img src={article.author.image} alt={article.author.username} /></a>

                        {/*  show the date the article created  */}
                        <div className="info">
                          <a href={`/profile/${article.author.username}`} className="author">{article.author.username}</a>
                          <span className="date">{article.createdAt}</span>
                        </div>
                        <button
                        
                        className="btn btn-outline-primary btn-sm pull-xs-right">
                          <i className="ion-heart"></i> {article.favoritesCount}
                        </button>
                      </div>

                      {/* Pon int user to the article   */}
                      <a href={`/article/${article.slug}`} className="preview-link">
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <span>Read more...</span>

                        {/* Display of the taList  */}
                        <ul className="tag-list">
                          {article.tagList.map((tag: string, tagIndex: number) => (
                            <li key={`${key}-${articleIndex}-${tagIndex}`} className="tag-default tag-pill tag-outline">{tag}</li>
                          ))}
                        </ul>
                      </a>
                    </div>

                  ));
                } else {
                  return <div key={key}>Invalid article value: {JSON.stringify(value)}</div>;
                }
              })}
       


       {/*  Pagination */}
        <ul className="pagination">
          <li className="page-item active">
            <a className="page-link" href="">1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="">2</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
  )
}

export default ProfileComponent

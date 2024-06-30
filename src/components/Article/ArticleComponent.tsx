import { useNavigate, useParams } from "react-router-dom";
import { useDeleteArticleMutation, useGetArticleQuery } from "../../services/ArticlesServices/articleService";
import { useAppSelector } from "../../app/hook";
import { useEffect, useState } from "react";
import { useCreateCommentMutation, useDeleteCommentMutation, useGetCommentsQuery } from "../../services/CommentsServices/CommeService";
import { toast } from "react-toastify";
import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from "../../services/FavoritesAService/FavoritesServices";
import { useFollowUserMutation,  useUnfollowUserMutation } from "../../services/ProfileServices/ProfileService";




/**
 * Toggles the favorite status of the current article.
 * 
 * If the article is currently favorited, it will be unfavorited. If the article is not favorited, it will be favorited.
 * 
 * This function will update the article's favorite status in the backend and refetch the article data to reflect the changes.
 * 
 * @async
 * @function handleFavoriteToggle
 * @returns {Promise<void>} - A Promise that resolves when the favorite status has been toggled.
 */
const ArticleComponent = () => {




  // Extract the article slug from the URL parameters.
  let { slug } = useParams();


  const safeSlug = slug ?? '';

  // Fetch the article data using the safeSlug.
  const { data: article, isLoading, error, refetch } = useGetArticleQuery(safeSlug);



  // Extract the author's username from the article data
  const authorUsername = article?.article.author.username;


  // Follow and Unfollow mutations
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();






  /**
   * Refetches the article data when the component mounts or the `refetch` function changes.
   *
   * This effect is used to ensure that the article data is up-to-date when the component is rendered.
   * It calls the `refetch` function provided by the `useGetArticleQuery` hook to fetch the article
   * data again.
   */
  useEffect(() => {
    refetch();
  }, [refetch]);


  // Create a new comment mutation function.
  const [createComment] = useCreateCommentMutation();

  // Initialize the comment text state.
  const [commentText, setCommentText] = useState('');


  // Fetch comments for the article using the safeSlug.
  const { data: commentsData, refetch: refetchComments } = useGetCommentsQuery(safeSlug);


  // Favorite and unfavorite mutations
  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();



  //  delete comment mutation
  const [deleteComment] = useDeleteCommentMutation();


  // delete article mutation
  const [deleteArticle] = useDeleteArticleMutation();

  // Navigate to the article list page when the user deletes the article.
  const navigate = useNavigate();

  // Access the current user's token from the global state.
  const { token } = useAppSelector((state) => state.user);

  console.log(article);

  // Handle loading state.
  if (isLoading) return <div>Loading...</div>;

  // Log the error or send it to a monitoring service here.
  if (error) return <div>Error loading article</div>;



  // Handle comment change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };



  /**
   * Submits a new comment for the current article.
   *
   * This function is called when the user clicks the "Submit" button to post a new comment.
   * It first checks if the comment text is not empty, then uses the `createComment` mutation
   * to send the comment to the server. If the comment is successfully posted, it clears
   * the comment text input and displays a success toast message. If there is an error,
   * it logs the error to the console.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event object.
   * @async
   * @function submitComment
   * @returns {Promise<void>} - A Promise that resolves when the comment has been submitted.
   */

  const submitComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!commentText.trim()) return;

    try {
      await createComment({ slug: safeSlug, payload: { comment: { body: commentText } } });
      toast.success('Comment posted successfully');
      setCommentText('');
      refetchComments(); // Refetch comments after successful creation
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };





  /**
   * Toggles the favorite status of the current article.
   * 
   * If the article is currently favorited, it will be unfavorited. If the article is not favorited, it will be favorited.
   * 
   * This function will update the article's favorite status in the backend and refetch the article data to reflect the changes.
   * 
   * @async
   * @function handleFavoriteToggle
   * @returns {Promise<void>} - A Promise that resolves when the favorite status has been toggled.
   */
  const handleFavoriteToggle = async () => {
    if (!article) return;

    const slug = article.article.slug;
    const isFavorited = article.article.favorited;

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
   * Toggles the follow status of the current article's author.
   * 
   * If the author is currently being followed, they will be unfollowed. If the author is not being followed, they will be followed.
   * 
   * This function will update the author's follow status in the backend and optionally refetch the article or user data to reflect the changes.
   * 
   * @async
   * @function handleFollowToggle
   * @returns {Promise<void>} - A Promise that resolves when the follow status has been toggled.
   */
  const handleFollowToggle = async () => {
    if (!authorUsername) return;

    const isFollowing = article?.article.author.following;
    try {
      if (isFollowing) {
        await unfollowUser(authorUsername).unwrap();
      } else {
        await followUser(authorUsername).unwrap();
      }
      // Optionally refetch article or user data here to update the UI
      refetch();
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };






  /**
   * Deletes a comment for the current article.
   *
   * This function will delete the specified comment from the backend and then refetch the comments to update the UI.
   *
   * @async
   * @function handleDeleteComment
   * @param {number} commentId - The ID of the comment to be deleted.
   * @returns {Promise<void>} - A Promise that resolves when the comment has been deleted.
   */
  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment({ slug: safeSlug, commentId }).unwrap();
      toast.success('Comment deleted successfully');
      refetchComments(); // Refetch comments after successful deletion
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };




  /**
   * Deletes the current article.
   *
   * This function will delete the article from the backend and then navigate to the home page.
   *
   * @async
   * @function handleDeleteArticle
   * @returns {Promise<void>} - A Promise that resolves when the article has been deleted.
   */
  const handleDeleteArticle = async () => {
    try {
      await deleteArticle(safeSlug).unwrap();
      toast.success('Article deleted successfully');
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };







  return (
    // Render the article content if available.
    <div >
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading article</div>}
      {!isLoading && !error && article && (

        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{ }</h1>

              {/*  Article Meta */}
              <div className="article-meta">
                <a href={`/profile/${article.article.author.username}`}>
                  <img src={article.article.author.image} alt={`${article.article.author.image}'s profile`} />
                </a>

                {/*  User Profile */}
                <div className="info">
                  <a href={`/profile/${article.article.author.username}`} className="author">{article.article.author.username}</a>
                  <span className="date">
                    {article.article.createdAt}
                  </span>
                </div>

                {/*  Follow and Favorite Button */}
                <button className="btn btn-sm btn-outline-secondary" onClick={handleFollowToggle}>
                  <i className="ion-plus-round"></i>
                  &nbsp; {article?.article.author.following ? 'Unfollow' : 'Follow'} {authorUsername} <span className="counter"></span>
                </button>

                {/* User favorite Post    */}
                &nbsp;&nbsp;
                <button className="btn btn-sm btn-outline-primary" onClick={handleFavoriteToggle}>
                  <i className="ion-heart"></i>
                  &nbsp; {article.article.favorited ? 'Unfavorite Post' : 'Favorite Post'} <span className="counter">{article.article.favoritesCount}</span>
                </button>

                {/* // Conditional rendering based on the presence of a token.
                     // If the token exists, render "Edit Article" and "Delete Article" buttons.
                    // Otherwise, render nothing. */}
                {
                  token ? (
                    <>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="ion-edit"></i> Edit Article
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteArticle}>
                        <i className="ion-trash-a"></i> Delete Article
                      </button>

                    </>
                  ) : null
                }
              </div>
            </div>
          </div>


          {/* Display the main content of the article */}

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{article.article.description}</p>
                <div dangerouslySetInnerHTML={{ __html: article.article.body || '' }}></div>
                <ul className="tag-list">
                  {article.article.tagList.map((tag: any, index: any) => (
                    <li key={index} className="tag-default tag-pill tag-outline">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr />

            {/* Display article actions (like, edit, delete) and author information */}
            <div className="article-actions">
              <div className="article-meta">

                {/* Display the user's profile image */}
                <a href="profile.html"><img
                  alt={article.article.author.image}
                  src={
                    article.article.author.image

                  } />
                </a>

                {/* Display the author's name */}
                <div className="info">
                  <a href="" className="author">
                    {article.article.author.username}
                  </a>

                  {/* Display the article's creation date */}
                  <span className="date">
                    {article.article.createdAt}
                  </span>
                </div>

                <button className="btn btn-sm btn-outline-secondary" onClick={handleFollowToggle}>
                  <i className="ion-plus-round"></i>
                  &nbsp; {article?.article.author.following ? 'Unfollow' : 'Follow'} {authorUsername} <span className="counter"></span>
                </button>
                &nbsp;
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart"></i>
                  &nbsp;
                  {
                    article.article.favorited ? 'Unfavorite Post' : 'Favorite Post'
                  }
                  <span className="counter">
                    {article.article.favoritesCount}
                  </span>
                </button>



                {/* Display edit and delete buttons only for authenticated users */}

                {
                  token ? (
                    <>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="ion-edit"></i> Edit Article
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteArticle}>
                        <i className="ion-trash-a"></i> Delete Article
                      </button>

                    </>
                  ) : null
                }
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">


                {/* Section for creating and displaying comments for the article */}

                <section>
                  <form className="card comment-form">
                    <div className="card-block">
                      <textarea
                        onChange={handleCommentChange}
                        value={commentText}
                        className="form-control" placeholder="Write a comment..." rows={3}></textarea>
                    </div>
                    <div className="card-footer">
                      <img src={article.article.author.image} className="comment-author-img" />

                      <button
                        onClick={submitComment}
                        className="btn btn-sm btn-primary">
                        Post Comment
                      </button>
                    </div>

                  </form>
                </section>


                {commentsData?.comments && commentsData?.comments?.map((comment) => (
                  <section key={`comment-${comment.id}`}>
                    <div className="card">
                      <div className="card-block">
                        <p className="card-text">{comment.body}</p>
                      </div>
                      <div className="card-footer">
                        <a href={`/profile/${comment.author.username}`} className="comment-author">
                          <img src={comment.author.image} alt={comment.author.username} className="comment-author-img" />
                        </a>
                        &nbsp;
                        <a href={`/profile/${comment.author.username}`} className="comment-author">{comment.author.username}</a>
                        <span className="date-posted">{new Date(comment.createdAt).toDateString()}</span>
                        <span className="mod-options">
                          <i className="ion-trash-a" onClick={() => handleDeleteComment(comment.id)}></i>
                        </span>
                      </div>
                    </div>
                  </section>
                ))}





              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}

export default ArticleComponent

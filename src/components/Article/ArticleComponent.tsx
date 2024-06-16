import { useParams } from "react-router-dom";
import { useGetArticleQuery } from "../../services/Articles/articleService";
import { useAppSelector } from "../../app/hook";
import { useState } from "react";
import { useCreateCommentMutation, useGetCommentsQuery } from "../../services/Comments/CommeService";
import { toast } from "react-toastify";



const ArticleComponent = () => {


  // Extract the article slug from the URL parameters.
  let { slug } = useParams();


  const safeSlug = slug ?? '';

  // Fetch the article data using the safeSlug.
  const { data: article, isLoading, error } = useGetArticleQuery(safeSlug);



  // Create a new comment mutation function.
  const [createComment] = useCreateCommentMutation();

  // Initialize the comment text state.
  const [commentText, setCommentText] = useState('');


  // Fetch comments for the article using the safeSlug.
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useGetCommentsQuery(safeSlug);


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



  // Submit comment query to the server
  const submitComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!commentText.trim()) return;

    try {
      // Use safeSlug instead of a hardcoded string
      await createComment({ slug: safeSlug, payload: { comment: { body: commentText } } });
      toast.success('Comment posted successfully');
      setCommentText('');
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };



  return (
    // Render the article content if available.
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading article</div>}
      {!isLoading && !error && article && (

        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{article.article.title}</h1>

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
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {article?.article.author.username}  <span className="counter">(10)</span>
                </button>

                {/* User favorite Post    */}
                &nbsp;&nbsp;
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart"></i>
                  &nbsp; Favorite Post <span className="counter">{article.article.favoritesCount}  </span>
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
                      <button className="btn btn-sm btn-outline-danger">
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
                <a href="profile.html"><img src={
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

                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {article.article.author.username} <span className="counter"> 
                    {article.article.author.following }
                  </span>
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
                      <button className="btn btn-sm btn-outline-danger">
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


                
                 {/* Display comments related to the article. Comments are visible even if the user is not logged in. */}
          
                {
                  !token && (
                  <>
                    {commentsLoading && <div>Loading comments...</div>}
                {commentsError && <div>Error fetching comments</div>}
                {comments && typeof comments === 'object' &&
                  Object.entries(comments).map(([key, value]) => {
                    const renderComment = (comment: any, index: number) => (
                      <section key={`${key}-${index}`}>
                        <div className="card">
                          <div className="card-block">
                            <p className="card-text">{comment.body}</p>
                          </div>
                          <div className="card-footer">
                            <a href={`/profile/${comment.author.username}`} className="comment-author">
                              <img src={comment.author.image} className="comment-author-img" />
                            </a>
                            &nbsp;
                            <a href={`/profile/${comment.author.username}`} className="comment-author">{comment.author.username}</a>
                            <span className="date-posted">{new Date(comment.createdAt).toDateString()}</span>
                          </div>
                        </div>
                      </section>
                    );

                    if (Array.isArray(value)) {
                      return value.map(renderComment);
                    } else {
                      return <div key={key}>Invalid comment value: {JSON.stringify(value)}</div>;
                    }
                  })
                }

                {/*  Deleted comment
                
                  NOW ENDPOINT FOR THIS 
                */}

                <section>
                  <div className="card">
                    <div className="card-block">
                      <p className="card-text">
                        With supporting text below as a natural lead-in to additional content.
                      </p>
                    </div>
                    <div className="card-footer">
                      <a href="/profile/author" className="comment-author">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                      </a>
                      &nbsp;
                      <a href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</a>
                      <span className="date-posted">Dec 29th</span>
                      <span className="mod-options">
                        <i className="ion-trash-a"></i>
                      </span>
                    </div>
                  </div>
                </section>
                  </>
                  )
                }

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleComponent

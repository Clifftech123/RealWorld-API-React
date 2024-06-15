import { useParams } from "react-router-dom";
import { useGetArticleQuery } from "../../services/Articles/articleService";
import { useAppSelector } from "../../app/hook";


const ArticleComponent = () => {


  // Extract the article slug from the URL parameters.
  let { slug } = useParams();
  const safeSlug = slug ?? '';

    // Fetch the article data using the safeSlug.
  const { data: article, isLoading, error } = useGetArticleQuery(safeSlug);

  // Access the current user's token from the global state.
  const { token } = useAppSelector((state) => state.user);

  console.log(article);

    // Handle loading state.
  if (isLoading) return <div>Loading...</div>;

   // Log the error or send it to a monitoring service here.
  if (error) return <div>Error loading article</div>;



  return (
    // Render the article content if available.
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading article</div>}
      {!isLoading && !error && article && (

        <div className="article-page">
          <div className="banner">
            <div className="container">


              <h1>{article?.title}</h1>

              <div className="article-meta">
                <a href={`/profile/${article.author?.username}`}>
                  <img src={article.author?.image} alt={`${article.author?.username}'s profile`} />
                </a>
                <div className="info">
                  <a href={`/profile/${article.author?.username}`} className="author">{article.author?.username}</a>
                  <span className="date">
                    {article!.createdAt}
                  </span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {article.author?.username}  <span className="counter">(10)</span>
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart"></i>
                  &nbsp; Favorite Post <span className="counter">{article.favoritesCount}  </span>
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

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{article?.description}</p>
                <div dangerouslySetInnerHTML={{ __html: article?.body || '' }}></div>
                <ul className="tag-list">
                  {article.tagList?.map((tag: any, index: any) => (
                    <li key={index} className="tag-default tag-pill tag-outline">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <div className="article-meta">
                <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                <div className="info">
                  <a href="" className="author">Eric Simons</a>
                  <span className="date">January 20th</span>
                </div>

                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow Eric Simons
                </button>
                &nbsp;
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart"></i>
                  &nbsp; Favorite Article <span className="counter">(29)</span>
                </button>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-edit"></i> Edit Article
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  <i className="ion-trash-a"></i> Delete Article
                </button>
              </div>
            </div>


            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
                  </div>
                  <div className="card-footer">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    <button className="btn btn-sm btn-primary">Post Comment</button>
                  </div>
                </form>

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
                  </div>
                </div>

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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleComponent

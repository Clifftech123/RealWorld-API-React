import { useParams } from "react-router-dom";
import { useGetProfileQuery } from "../../services/ProfileServices/ProfileService";
import { useAppSelector } from "../../app/hook";
import { ArticlesFeedComponent } from "../Article/ArticlesFeedComponent";


const ProfileComponent = () => {

  let { username } = useParams();
  const safeusername  = username  ?? '';
   // Fetch user profile
   const { data: userProfile } = useGetProfileQuery( safeusername);


  //    // Fetch articles feed
  // const { data: articlesFeed, isError:articlesError , isLoading: isArticlesFeedLoading } = useGetArticlesFeedQuery(); 


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
        
          <ArticlesFeedComponent/>
      </div>
    </div>
  </div>
</div>
  )
}

export default ProfileComponent

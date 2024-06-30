import { useParams } from "react-router-dom";
import { useFollowUserMutation, useGetProfileQuery, useUnfollowUserMutation } from "../../services/ProfileServices/ProfileService";
import { useAppSelector } from "../../app/hook";
import { ArticlesFeedComponent } from "../Article/ArticlesFeedComponent";
import { useEffect } from "react";


const ProfileComponent = () => {

  let { username } = useParams();
  const safeusername = username ?? '';
  // Fetch user profile
  const { data: userProfile, refetch } = useGetProfileQuery(safeusername);

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();


  // refetch the user profile when the username changes
  useEffect(() => {
    refetch();
  }, [username]); // Refetch the user profile when the username changes

  const handleFollowToggle = async (username: string, isFollowing: boolean) => {
    try {
      if (isFollowing) {
        await unfollowUser(username).unwrap();
      } else {
        await followUser(username).unwrap();
      }
      refetch();
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }

  }

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
              <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => userProfile?.profile.username && handleFollowToggle(userProfile.profile.username, userProfile.profile.following)}>
                {userProfile?.profile.following ? "Unfollow" : "Follow"} {userProfile?.profile.username ?? ''}
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

            <ArticlesFeedComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileComponent

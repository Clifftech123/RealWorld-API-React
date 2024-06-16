import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';
import { useGetCurrentUserQuery } from '../../services/User/userService';

const HeaderComponent = () => {

  // Access the user token from the global state.
  const { token } = useAppSelector((state) => state.user);


  // Fetch the current user data using the token.
  const { data: currentUser, isSuccess } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });


  return (


    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        <h1>

        </h1>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          {token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/editor">
                  <i className="ion-compose"></i>&nbsp;New Article
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </Link>
              </li>
              <li className="nav-item">


                {/* Display user information if the data retrieval from the backend is successful */}
                {isSuccess && (

                  <Link className="nav-link" to={`/profile/${currentUser.user.username}`}>
                    {currentUser.user.image ? (
                      <img src={currentUser.user.image} className="user-pic" alt="User Profile" />
                    ) : (

                      <span className="user-pic-placeholder">No Image</span>
                    )}

                    {
                      currentUser.user.username
                    }

                  </Link>
                )}

              </li>
            </>
          )}

          {/* Render this component only if the user is not logged in */}
          {!token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default HeaderComponent;

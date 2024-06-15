import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';
import { useGetCurrentUserQuery } from '../../services/User/userService';

const HeaderComponent = () => {
  const { token } = useAppSelector((state) => state.user);

  const { data: currentUser, isSuccess } = useGetCurrentUserQuery(undefined, {
    skip: !token, 
  });
  console.log(currentUser);
  console.log(isSuccess)



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
               
              {isSuccess && (
              
              <Link className="nav-link" to={`/profile/${currentUser.username}`}>
              {currentUser.image ? (
                <img src={currentUser.image} className="user-pic" alt="User Profile" />
              ) : (
          
                <span className="user-pic-placeholder">No Image</span>
              )}
                
                 {
                  currentUser.username
                 }

            </Link>
              )}
                
              </li>
            </>
          )}
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

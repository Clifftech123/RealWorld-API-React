
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';



/**
 * A protected route component that redirects unauthenticated users to the login page.
 * 
 * This component checks if the user has a valid token in the application state. If the token is present, it renders the `Outlet` component, which allows the protected content to be displayed. If the token is not present, it redirects the user to the login page using the `Navigate` component.
 */
const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.user);
  return token ? <Outlet /> : <Navigate to="/login" />;
};


export default ProtectedRoute;
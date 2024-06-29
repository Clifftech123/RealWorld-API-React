
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';


// Protected route component
const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.user);
  return token ? <Outlet /> : <Navigate to="/login" />;
};


export default ProtectedRoute;
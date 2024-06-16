import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/UserSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const useLogoutUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const logout = async () => {
      try {
        // Clear user data from local storage
        localStorage.removeItem('user');
        // Dispatch the logoutUser action
        dispatch(logoutUser());
        // Redirect to the home page
        navigate('/');
        // Display success message
        toast.success('You have been logged out');
      } catch (error) {
        console.error('Logout failed:', error);
        // Handle errors (e.g., display error message)
        toast.error('Logout failed. Please try again.');
      }
    };
  
    return logout;
  };
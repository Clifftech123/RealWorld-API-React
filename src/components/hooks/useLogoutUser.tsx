import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/UserSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


/**
 * A custom hook that provides a function to log out the current user.
 * 
 * This hook clears the user data from local storage, dispatches the `logoutUser` action,
 * navigates to the home page, and displays a success message using `react-toastify`.
 * 
 * @returns {function} A function that can be called to log out the current user.
 */
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
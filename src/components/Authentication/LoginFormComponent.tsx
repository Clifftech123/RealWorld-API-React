import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/User/userService';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hook';
import { setToken } from '../../Satete/UserSlice';

interface FormData {
  email: string;
  password: string;
}

const LoginFormComponent = () => {
 
// LoginFormComponent: A functional component for handling user login.
// Utilizes React hooks for state management and form handling.
// Integrates with a Redux store and navigation via React Router.

// State initialization:
// - formData: Holds the form's input data for email and password.
// - isLoading: Tracks the loading state of the login process.
// - errorMessage: Stores any error messages to display to the user.
const [formData, setFormData] = useState<FormData>({
  email: '',
  password: '',
});
const [loginUser, { isLoading }] = useLoginUserMutation();
const [errorMessage, setErrorMessage] = useState('');

// Hooks for dispatching actions to the Redux store and navigating programmatically.
const dispatch = useAppDispatch();
const navigate = useNavigate();

// handleChange: Updates formData state with current input values.
// Ensures form inputs are controlled components.
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

// handleSubmit: Asynchronously handles form submission.
// - Prevents default form submission behavior.
// - Attempts to log in the user with provided credentials.
// - On success: Stores the user token, updates Redux store, shows success message, and navigates to the homepage.
// - On failure: Sets an appropriate error message based on the error received.
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await loginUser({ ...formData }).unwrap();
    const user = response.user;
    if (user?.token) {
      // Persist user token for session management.
      localStorage.setItem('token', user.token); 
      // Update global state with the user token.
      dispatch(setToken(user.token)); 
      toast.success('Login successful'); 
      navigate('/'); 
    } else {
      setErrorMessage('Invalid token received'); 
    }
  } catch (err: any) {
    // Set an appropriate error message based on the server response or a default message.
    if (err.data?.errors) {
      setErrorMessage(err.data.errors.email || 'Invalid email or password');
    } else {
      setErrorMessage('An error occurred');
    }
  }
};
  

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <a href="/register">Need an account?</a>
            </p>

            {errorMessage && (
              <ul className="error-messages">
                <li>{errorMessage}</li>
              </ul>
            )}

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right" type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormComponent;

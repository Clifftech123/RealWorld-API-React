import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/UserServices/userService';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hook';
import { setToken } from '../../features/auth/UserSlice';

interface FormData {
  email: string;
  password: string;
}

const LoginFormComponent = () => {

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

  /**
   * Handles the submission of the login form.
   *
   * @param e - The form submission event.
   * @returns Promise<void> - Resolves when the login process is complete.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior.
    e.preventDefault();
  
    try {
      // Attempt to log in the user using the provided email and password.
      const response = await loginUser({ ...formData }).unwrap();
      const user = response.user;
  
      // If a valid token is received, persist it in local storage and update the global state.
      if (user?.token) {
        localStorage.setItem('token', user.token);
        dispatch(setToken(user.token));
        toast.success('Login successful');
        navigate('/');
      } else {
        // If an invalid token is received, set an error message.
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

            {/*  Display an error massage */}
            {errorMessage && (
              <ul className="error-messages">
                <li>{errorMessage}</li>
              </ul>
            )}

            {/*  form for user login */}
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                {/*  user email */}
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </fieldset>

              {/*  user password */}
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

              {/*  submit button */}
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

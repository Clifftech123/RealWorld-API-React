import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../services/User/userService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


interface FormData {
  username: string;
  email: string;
  password: string;
}

const SingUpComponent = () => {


const navigate = useNavigate();

// Initialize form data state with default values
const [formData, setFormData] = useState<FormData>({
  username: '',
  email: '',
  password: '',
});
// Use the custom hook for registering a user, which returns the mutation function and its state
const [registerUser, { isLoading }] = useRegisterUserMutation();
// State for storing and displaying error messages
const [errorMessage, setErrorMessage] = useState('');

// Function to handle form field changes, updating the formData state
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Function to handle form submission
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Prevent default form submission behavior
  try {
    // Attempt to register the user with the provided form data
    await registerUser({ ...formData }).unwrap();
    
    // Show success message upon successful registration
    toast.success('Registration successful');
    // Reset form fields to initial state
    setFormData({
      username: '',
      email: '',
      password: '',
    });

    // Navigate to the login page after successful registration
    navigate('/login');
  } catch (err: any) { // Catch and handle any errors during registration
    // Set error message based on the error response, defaulting to a generic error message
    if (err.data?.errors) {
      setErrorMessage(err.data.errors.email || 'An error occurred');
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
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="/login">Have an account?</a>
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
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </fieldset>
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
                {isLoading ? 'Loading...' : 'Sign up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUpComponent;

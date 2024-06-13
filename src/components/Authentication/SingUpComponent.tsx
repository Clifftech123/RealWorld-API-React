import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook'
import { toast } from 'react-toastify';
import { setToken } from '../../features/UserSlice';


interface FormData {
  username: string;
  email: string;
  password: string;
}

const SingUpComponent = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });
  const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();
  const [errorMessage, setErrorMessage] = useState('');
  



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const userData = await registerUser({ ...formData }).unwrap();
    dispatch(setToken(userData.token?.toString() || '')); // Use optional chaining and convert to string
    toast.success('Registration successful');
    // Clear form fields
    setFormData({
      username: '',
      email: '',
      password: '',
    });

    navigate('/login');
  } catch (err: any) {
    if (err.data && err.data.errors) {
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

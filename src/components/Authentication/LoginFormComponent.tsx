import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/userService';
import { toast } from 'react-toastify';
import { setCurrentUser } from '../../features/UserSlice';
import { useAppDispatch } from '../../app/hook';

interface FormData {
  email: string;
  password: string;
}

const LoginFormComponent = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser({ ...formData }).unwrap();
      const user = response.user;
      if (user && user.token) {
        dispatch(
          setCurrentUser({
            token: user.token,
            email: user.email,
            username: user.username,
            // You can also add bio and image here if needed
          }),
        );
        toast.success('Login successful');
        navigate('/');
      } else {
        setErrorMessage('Invalid token received');
      }
    } catch (err: any) {
      if (err.data && err.data.errors) {
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

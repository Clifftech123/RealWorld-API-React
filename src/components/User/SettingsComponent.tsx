import { useState } from "react";
import { useUpdateUserMutation } from "../../services/User/userService";
import { useLogoutUser } from "../hooks/useLogoutUser";
import { toast } from "react-toastify";


const SettingsComponent = () => {

  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [profile, setProfile] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  // clear the form when the user is updated
  const clearForm = () => {
    setProfile('');
    setUsername('');
    setBio('');
    setEmail('');
    setPassword('');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

    //  call the clear the function when user updated the function 
      clearForm();
      const result = await updateUser({ username, email, bio, image: profile, password }).unwrap();
      console.log('Update successful', result);
      
      toast.success('User updated successfully');
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
      console.error('Failed to update user:', error);

    }
  };

  const logout = useLogoutUser();

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ul className="error-messages">
              <li>
                {errorMessage}
              </li>
            </ul>

            <form
              onSubmit={handleSubmit}
            >
              <fieldset>
                {/* User new profile picture */}
                <fieldset className="form-group">
                  <input
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    className="form-control" type="text" placeholder="URL of profile picture" />
                </fieldset>

                {/* User new username */}
                <fieldset className="form-group">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control form-control-lg" type="text" placeholder="Your Name" />
                </fieldset>

                {/* user new   bio  */}
                <fieldset className="form-group">
                  <textarea
                    value={bio}
                    className="form-control form-control-lg"
                    rows={8}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Short bio about you"
                  ></textarea>
                </fieldset>

                {/*  User new email  */}
                <fieldset className="form-group">
                  <input
                    value={email}

                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-lg" type="text" placeholder="Email" />
                </fieldset>
                {/*  User new password  */}
                <fieldset className="form-group">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                  />
                </fieldset>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
              </fieldset>
            </form>
            <hr />
            <button
              onClick={logout}
              className="btn btn-outline-danger">Or click here to logout.</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsComponent
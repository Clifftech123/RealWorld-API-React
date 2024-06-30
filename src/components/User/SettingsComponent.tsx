import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../services/UserServices/userService";
import { useLogoutUser } from "../hooks/useLogoutUser";
import { toast } from "react-toastify";
import {  useSelector } from "react-redux";
import { RootState } from "../../app/store";


const SettingsComponent = () => {

  const user = useSelector((state: RootState) => state.user);


  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [profile, setProfile] = useState(user.image || '');
  const [username, setUsername] = useState(user.username || '');
  const [bio, setBio] = useState(user.bio || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  /**
   * Initializes the state of the SettingsComponent with the user's profile information.
   *
   * This effect is triggered when the `user` prop changes, and it updates the component's state
   * with the user's image, username, bio, and email. This ensures that the form fields are
   * pre-populated with the user's current information.
   */
 
  useEffect(() => {
    setProfile(user.image || '');
    setUsername(user.username || '');
    setBio(user.bio || '');
    setEmail(user.email || '');

    console.log("user", user);
  }, [user]);

  // clear the form when the user is updated
  const clearForm = () => {
    setProfile('');
    setUsername('');
    setBio('');
    setEmail('');
    setPassword('');
  }

  /**
   * Handles the submission of the user settings form.
   * 
   * This function is called when the user submits the form to update their profile information.
   * It clears the form fields, attempts to update the user's information using the `updateUser` mutation,
   * and displays a success or error message using the `toast` library.
   *
   * @param e - The form submission event.
   * @returns void
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
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
import ProfileComponent from "../../components/User/ProfileComponent"
import LayoutComponent from "../../components/Layout"


/**
 * Renders the user profile page, which includes the layout component and the profile component.
 */
const UserProfilePage = () => {
  return (
    <LayoutComponent>
      <ProfileComponent />
    </LayoutComponent>
  )
}

export default UserProfilePage





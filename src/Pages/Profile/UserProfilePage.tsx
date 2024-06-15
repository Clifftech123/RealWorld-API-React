import ProfileComponent from "../../components/User/ProfileComponent"
import LayoutComponent from "../../components/Layout"


// UserProfilePage: Displays user profile using ProfileComponent within the global layout.
const UserProfilePage = () => {
  return (
    <LayoutComponent>
      <ProfileComponent />
    </LayoutComponent>
  )
}

export default UserProfilePage





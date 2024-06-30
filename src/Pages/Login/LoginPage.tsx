import LoginFormComponent from "../../components/Authentication/LoginFormComponent"
import LayoutComponent from "../../components/Layout"




/**
 * Renders the login page, which includes the login form component within a layout component.
 */
const LoginPage = () => {
  return (
    <LayoutComponent>
        <LoginFormComponent />
    </LayoutComponent>
  )
}

export default LoginPage
import LoginFormComponent from "../../components/Authentication/LoginFormComponent"
import LayoutComponent from "../../components/Layout"


// LoginPage: Wraps LoginFormComponent in LayoutComponent for consistent app layout.

const LoginPage = () => {
  return (
    <LayoutComponent>
        <LoginFormComponent />
    </LayoutComponent>
  )
}

export default LoginPage

import LayoutComponent from '../../components/Layout'
import SingUpComponent from '../../components/Authentication/SingUpComponent'

/**
 * Renders the signup page, which includes the layout component and the signup component.
 * @returns {JSX.Element} The signup page component.
 */
const SingUpPage = () => {
  return (
   <LayoutComponent>
     <SingUpComponent />
   </LayoutComponent>
  )
}

export default SingUpPage

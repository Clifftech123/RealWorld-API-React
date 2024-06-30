
import LayoutComponent from '../../components/Layout'
import SettingsComponent from '../../components/User/SettingsComponent'



/**
 * Renders the settings page, which includes the layout component and the settings component.
 * @returns {JSX.Element} The rendered settings page.
 */
const SettingsPage = () => {
  
  return (
   <LayoutComponent>
    <SettingsComponent />
   </LayoutComponent>
  )
}

export default SettingsPage

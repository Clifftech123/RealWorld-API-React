import { Route, Routes } from 'react-router-dom'
import HomePage from '../../Pages/Home/HomePage'
import ArticlePage from '../../Pages/Article/ArticlePage'
import UserProfilePage from '../../Pages/Profile/UserProfilePage'
import LoginPage from '../../Pages/Login/LoginPage'
import SingUpPage from '../../Pages/Signup/SingupPage'
import SettingsPage from '../../Pages/Settings/SettingsPage'
import CreateEditArticlePage from '../../Pages/Article/CreateEditArticlePage'
import { ArticlesFeedComponent } from '../Article/ArticlesFeedComponent'




// RouterComponent: Manages app routing with react-router-dom, mapping URLs to components.

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="your-feed" element={<ArticlesFeedComponent />} />
      </Route>
      <Route path="/article/:slug" element={<ArticlePage />} />
      <Route path="/editor" element={<CreateEditArticlePage />} />
      <Route path="/profile/:username" element={<UserProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SingUpPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}

export default RouterComponent
import { Route, Routes } from 'react-router-dom'
import HomePage from '../../Pages/Home/HomePage'
import ArticlePage from '../../Pages/Article/ArticlePage'
import UserProfilePage from '../../Pages/Profile/UserProfilePage'
import LoginPage from '../../Pages/Login/LoginPage'
import SingUpPage from '../../Pages/Signup/SingupPage'
import SettingsPage from '../../Pages/Settings/SettingsPage'
import CreateEditArticlePage from '../../Pages/Article/CreateEditArticlePage'
import { ArticlesFeedComponent } from '../Article/ArticlesFeedComponent'
import ProtectedRoute from './ProtectedRout'




/**
 * Defines the main routing component for the application, handling both public and protected routes.
 * 
 * The `RouterComponent` is responsible for rendering the appropriate page components based on the current URL path.
 * It includes routes for the home page, article page, user profile page, login page, and sign-up page.
 * It also includes protected routes that require authentication, such as the article feed, settings page, and article editor.
 * 
 * The `ProtectedRoute` component is used to ensure that only authenticated users can access the protected routes.
 */
const RouterComponent = () => {
  return (
    <Routes>
    {/* Public routes */}
    <Route path="/" element={<HomePage />}>
    </Route>
    <Route path="/article/:slug" element={<ArticlePage />} />
    <Route path="/profile/:username" element={<UserProfilePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<SingUpPage />} />

    {/* Protected routes */}
    <Route element={<ProtectedRoute />}>
    <Route path="your-feed" element={<ArticlesFeedComponent />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/editor" element={<CreateEditArticlePage />} />
      <Route path="/editor/:slug" element={<CreateEditArticlePage />} />
    </Route>
  </Routes>
  );
};

export default RouterComponent;
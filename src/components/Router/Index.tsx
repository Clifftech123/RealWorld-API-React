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
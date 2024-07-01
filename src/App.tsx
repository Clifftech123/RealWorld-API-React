import { ToastContainer } from "react-toastify";
import RouterComponent from "./components/Router/Index"
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "./app/hook";
import { useEffect } from "react";
import { setToken, setUserProfile } from "./features/auth/UserSlice";
import { useGetRecentArticlesQuery } from "./services/ArticlesServices/articleService";
import { useGetProfileQuery } from "./services/ProfileServices/ProfileService";


function App() {
  const dispatch = useAppDispatch();
  const { data: articlesResponse } = useGetRecentArticlesQuery({});

  // Extract the author's username from the article data
  const username = articlesResponse?.articles[0]?.author.username;
  console.log("username", username);

  const { data: profileData } = useGetProfileQuery<any>(username ?? '');


  // Update the user profile in the Redux store when the profile data is received
  useEffect(() => {
    if (profileData) {
      dispatch(setUserProfile(profileData));
    }
  }, [dispatch, profileData]);


  // Set the user token in the Redux store when the token is received
  useEffect(() => {

    const token = localStorage.getItem('token');

    if (token) {
      dispatch(setToken(token));
    }

  }, [dispatch]);


  return (
    <>

      <section>
        < RouterComponent />
      </section>
      <ToastContainer />
    </>
  )
}

export default App


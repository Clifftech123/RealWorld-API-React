import { ToastContainer } from "react-toastify";
import RouterComponent from "./components/Router/Index"
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "./app/hook";
import { useEffect } from "react";
import { setToken } from "./features/auth/UserSlice";





function App() {

  // Use the useAppDispatch hook to get a reference to the dispatch function
  const dispatch = useAppDispatch();

  // Use the useEffect hook to perform side effects in the component
  useEffect(() => {
      // Retrieve the 'token' from localStorage
    const token = localStorage.getItem('token');
     // If a token exists, dispatch it to the Redux store
    if (token) {
      dispatch(setToken(token));
    }
   
    // The dependency array includes dispatch to ensure the effect is run
  // whenever the dispatch function changes, which should only happen when the component mounts
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


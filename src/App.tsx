import { ToastContainer } from "react-toastify";
import RouterComponent from "./components/Router/Index"
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "./app/hook";
import { useEffect } from "react";
import { setToken } from "./features/auth/UserSlice";





function App() {


  const dispatch = useAppDispatch();
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


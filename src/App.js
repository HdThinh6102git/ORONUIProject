
import Register from "./pages/register/Register.jsx"
import Login from "./pages/login/Login.jsx"
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import NavBar from "./components/navbar/NavBar.jsx"
import LeftBar from "./components/leftbar/LeftBar.jsx"
import RightBar from "./components/rightbar/RightBar.jsx"
import Home from "./pages/home/Home.jsx"
import Profile from "./pages/profile/Profile.jsx"
import "./style.scss"
import { useContext } from "react";
import {DarkModeContext} from "./context/darkModeContext.js"
import { AuthContext } from "./context/authContext.js";
import { QueryClient, QueryClientProvider } from 'react-query'
function App() {
  //common layout 

  //not login 
  const {currentUser} = useContext(AuthContext); 

  const {darkMode} = useContext(DarkModeContext)
  const queryClient = new QueryClient()
  


  const Layout = ()=>{
    return (
      <QueryClientProvider client={queryClient}>
      <div className = {`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar/>
        <div style={{display: "flex"}}>
          <LeftBar/>
          <div style={{flex:6}}>
            <Outlet/>
          </div>
          
          <RightBar/>
        </div>
      </div>
      </QueryClientProvider>
    )
  }

  //Protected Route (check login or not yet)
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  }

  //router
  const router = createBrowserRouter([
    {
      path:"/",
      element: (
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>), 
      children:[
        {
          path:"/", 
          element: <Home/>
        },
        {
          path:"/profile/:id", 
          element: <Profile/>
        },
      ]
    },
    {
      path: "/login",
      element: <Login/>,
      
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);
//

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

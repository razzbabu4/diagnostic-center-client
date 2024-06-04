import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authencation/Login";
import Register from "../pages/Authencation/Register";
import Dashboard from "../layouts/Dashboard";
import Appointment from "../pages/Appointment";
import AllTest from "../pages/AllTest";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/allTest',
          element: <AllTest/>
        },
        {
          path: '/appointment',
          element: <Appointment/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/register',
          element: <Register/>
        },
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard/>,
      children: [

      ]
    }
  ]);
  
  export default router;
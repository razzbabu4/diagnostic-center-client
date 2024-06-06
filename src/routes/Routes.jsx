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
import AllUser from "../pages/Dashboard/AllUser";
import AddBanner from "../pages/Dashboard/AddBanner";
import AllBanner from "../pages/Dashboard/AllBanner";
import AddTest from "../pages/Dashboard/AddTest";
import ManageTest from "../pages/Dashboard/ManageTest";
import UpdateTest from "../pages/Dashboard/UpdateTest";
  
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
          path: 'allTest',
          element: <AllTest/>
        },
        {
          path: 'appointment',
          element: <Appointment/>
        },
        {
          path: 'login',
          element: <Login/>
        },
        {
          path: 'register',
          element: <Register/>
        },
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard/>,
      children: [
        {
          path: 'allUsers',
          element: <AllUser/>
        },
        {
          path: 'addBanner',
          element: <AddBanner/>
        },
        {
          path: 'allBanner',
          element: <AllBanner/>
        },
        {
          path: 'addTest',
          element: <AddTest/>
        },
        {
          path: 'manageTest',
          element: <ManageTest/>
        },
        {
          path: 'updateTest/:id',
          element: <UpdateTest/>,
          loader: ({params})=> fetch(`http://localhost:5000/tests/${params.id}`)
        },
      ]
    }
  ]);
  
  export default router;
import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authencation/Login";
import Register from "../pages/Authencation/Register";
import Dashboard from "../layouts/Dashboard";
import AllTest from "../pages/AllTest";
import AllUser from "../pages/Dashboard/AllUser";
import AddBanner from "../pages/Dashboard/AddBanner";
import AllBanner from "../pages/Dashboard/AllBanner";
import AddTest from "../pages/Dashboard/AddTest";
import ManageTest from "../pages/Dashboard/ManageTest";
import UpdateTest from "../pages/Dashboard/UpdateTest";
import ViewDetailsTest from "../components/ViewDetailsTest";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Reviews from "../pages/Reviews";
import ErrorPage from "../pages/ErrorPage";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import UpdateProfile from "../pages/Dashboard/User/UpdateProfile";
import MyAppointment from "../pages/Dashboard/User/MyAppointment";
import Reservation from "../pages/Dashboard/Reservation";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import UploadReport from "../pages/Dashboard/UploadReport";
import TestResult from "../pages/Dashboard/User/TestResult";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'allTest',
        element: <AllTest />
      },
      {
        path: 'about',
        element: <AboutUs />
      },
      {
        path: 'contact',
        element: <ContactUs />
      },
      {
        path: 'reviews',
        element: <Reviews />
      },
      {
        path: 'viewDetailsTest/:id',
        element: <ViewDetailsTest />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: 'userProfile',
        element: <MyProfile />
      },
      {
        path: 'updateProfile',
        element: <UpdateProfile />
      },
      {
        path: 'appointment',
        element: <MyAppointment />
      },
      {
        path: 'testResult',
        element: <TestResult />
      },
      // admin routes
      {
        path: 'allUsers',
        element: <AllUser />
      },
      {
        path: 'adminHome',
        element: <AdminHome />
      },
      {
        path: 'addBanner',
        element: <AddBanner />
      },
      {
        path: 'allBanner',
        element: <AllBanner />
      },
      {
        path: 'addTest',
        element: <AddTest />
      },
      {
        path: 'manageTest',
        element: <ManageTest />
      },
      {
        path: 'updateTest/:id',
        element: <UpdateTest />,
        loader: ({ params }) => fetch(`https://diagnostic-center-management-system-server.vercel.app/tests/${params.id}`)
      },
      {
        path: 'reservation',
        element: <Reservation />
      },
      {
        path: 'uploadReport/:id',
        element: <UploadReport/>
      }

    ]
  }
]);

export default router;
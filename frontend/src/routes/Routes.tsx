import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/login/Login";
import HomeLayout from "../layouts/HomeLayout";
import Following from "../pages/following/Following";
import Register from "../pages/register/Register";
import CreateBlog from "../pages/createBlog/CreateBlog";
import UserProfile from "../pages/selfProfile/selfProfile";
import ReadBlog from "../pages/readBlog/ReadBlog";
import Search from "../pages/search/Search";
import OTP from "../pages/otp-verify/Otp";
import EditBlogPage from "../pages/edit-blog/EditBlog";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/verify-otp",
        element: <OTP />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/user/following",
        element: <Following />,
      },
      {
        path: "/user/create-blog",
        element: <CreateBlog />,
      },
      {
        path: "/user/profile",
        element: <UserProfile />,
      },
      {
        path: "/user/blog/:id",
        element: <ReadBlog />,
      },
      {
        path: "/user/blogs/search",
        element: <Search />,
      },
      {
        path: "/user/edit-blog/:id",
        element: <EditBlogPage />,
      },
    ],
  },
]);

export default router;
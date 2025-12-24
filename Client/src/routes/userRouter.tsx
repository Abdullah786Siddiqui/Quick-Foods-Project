import AuthLayout from "@/layouts/user_Layout/auth/layout";
import UserLogin from "@/layouts/user_Layout/auth/login";
import UserSignup from "@/layouts/user_Layout/auth/signup";
import UserLayout from "@/layouts/user_Layout/app";
import UserHome from "@/pages/user/home/home";

export const userRoutes = [
  {
    path: "/",
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <UserLogin /> },
          { path: "signup", element: <UserSignup /> },
        ],
      },
      {
        element: <UserLayout />, // protected layout
        children: [
          { index: true, element: <UserHome /> },
        ],
      },
    ],
  },
];

// routes/userRouter.tsx
import UserLogin from "@/layouts/user_Layout/auth/login";
import UserSignup from "@/layouts/user_Layout/auth/signup";
import UserLayout from "@/layouts/user_Layout/app";
import UserHome from "@/pages/user/home/home";


export const userRoutes = [
  {
    path: "/user",
    children: [
      { path: "login", element: <UserLogin /> },
      { path: "signup", element: <UserSignup /> },
      {
        element: <UserLayout />, // protected layout after login
        children: [
          { index: true, element: <UserHome /> },
     
        ],
      },
    ],
  },
];

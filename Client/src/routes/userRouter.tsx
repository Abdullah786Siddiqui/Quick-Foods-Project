
import UserLogin from "@/layouts/user_Layout/auth/login";
import UserSignup from "@/layouts/user_Layout/auth/signup";
import UserLayout from "@/layouts/user_Layout/app";
import Checkout from "@/pages/user/checkout/checkout";
import PrivateRoute from "./specialRoutes/privateRoutes";
import ProtectedRoute from "./specialRoutes/protectedRoutes";
import UserAuthLayout from "@/layouts/user_Layout/auth/layout";
import UserLocation from "@/pages/user/home/UserLocation";
import UserHome from "@/pages/user/home/home";
import LocationGuard from "./specialRoutes/locationGuards";

export const userRoutes = [
  {
    path: "/",
    children: [
      {
        element: (
          <ProtectedRoute role="user" route="">
            <UserAuthLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "login", element: <UserLogin /> },
          { path: "signup", element: <UserSignup /> },
        ],
      },
      {
        // Public Routes Any User Authenticated or not
        element: <UserLayout />,
        children: [
          { index: true, element: (<LocationGuard><UserHome /></LocationGuard>)},
          { path: '/location',  element: (<LocationGuard reverse={true}><UserLocation /> </LocationGuard> ),},

          {
            // Private Routes Any User Authenticated  or not
            element: <PrivateRoute route="" role="user" />
            , children: [
              {
                path: "checkout", element: (
                  <LocationGuard>
                    <Checkout />
                  </LocationGuard>
                )
              }
            ]
          },
        ],
      },
    ],
  },
];

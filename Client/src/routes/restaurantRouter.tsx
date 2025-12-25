

// Admin Pages
import RestaurantLogin from "@/layouts/restaurant_layout/auth/login";
import PrivateRoute from "./specialRoutes/privateRoutes";
import ProtectedRoute from "./specialRoutes/protectedRoutes";
import RestaurantAuthLayout from "@/layouts/restaurant_layout/auth/layout";
import RestaurantDashboard from "@/layouts/restaurant_layout/app";
import Analytics from "@/pages/restaurant/Dashboard/Analytics";

export const restaurantRoutes = [
  {
    path: "/restaurant",

    children: [
      // ✅ PUBLIC ROUTES
      {
        element: (
          <ProtectedRoute role="restaurant" route="restaurant">
            <RestaurantAuthLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "login", element: <RestaurantLogin /> },
        ]
      },

      // 🔒 PROTECTED RESTAURANT ROUTES
      {
        element: <PrivateRoute route="/restaurant" role="restaurant" />,
        children: [
          {
            element: <RestaurantDashboard />,
            children: [
              { index: true, element: <Analytics /> },
              
            ],
          },
        ],
      },
    ],
  },
];

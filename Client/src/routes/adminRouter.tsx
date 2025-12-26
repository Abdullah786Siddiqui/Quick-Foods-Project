

// Admin Pages
import AdminDashboard from "@/layouts/admin_layout/app";
import Users from "@/pages/admin/Users/users";
import Restaurant from "@/pages/admin/restaurant/restaurant";
import Delivery from "@/pages/admin/delivery/delivery";
import AdminLogin from "@/layouts/admin_layout/auth/login";
import PrivateRoute from "./specialRoutes/privateRoutes";
import ProtectedRoute from "./specialRoutes/protectedRoutes";
import AdminAuthLayout from "@/layouts/admin_layout/auth/layout";
import Menu from "@/pages/admin/Menu/menu";
import Dashboard from "@/pages/admin/Dashboard/dashboard";

export const adminRoutes = [
  {
    path: "/admin",

    children: [
      // ✅ PUBLIC ROUTES
      {
        element: (
          <ProtectedRoute role="admin" route="admin">
            <AdminAuthLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "login", element: <AdminLogin /> },
        ]
      },

      // 🔒 PROTECTED ADMIN ROUTES
      {
        element: <PrivateRoute route="/admin" role="admin" />,
        children: [
          {
            element: <AdminDashboard />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "users", element: <Users /> },
              { path: "restaurant", element: <Restaurant /> },
              { path: "delivery", element: <Delivery /> },
              { path: "menu", element: <Menu /> },

            ],
          },
        ],
      },
    ],
  },
];

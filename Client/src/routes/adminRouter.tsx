// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";

// Admin
import AdminDashboard from "@/layouts/admin_layout/app";
import Users from "@/pages/admin/Users/users";
import Analytics from "@/pages/admin/Dashboard/analytics";
import Restaurant from "@/pages/admin/restaurant/restaurant";
import Delivery from "@/pages/admin/delivery/delivery";
import AdminLogin from "@/layouts/admin_layout/auth/login";
import AdminSignup from "@/layouts/admin_layout/auth/signup";

export const adminRouter = createBrowserRouter([
  {
    path: "/admin",
    children: [
      { path: "login", element: <AdminLogin /> },
      { path: "signup", element: <AdminSignup /> },
      {
        element: <AdminDashboard />,
        children: [
          { index: true, element: <Analytics /> },
          { path: "users", element: <Users /> },
          { path: "restaurant", element: <Restaurant /> },
          { path: "delivery", element: <Delivery /> },
        ],
      },
    ],
  },
]);

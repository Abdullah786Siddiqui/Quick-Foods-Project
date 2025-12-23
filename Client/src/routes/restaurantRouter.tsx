import RestaurantLogin from "@/layouts/restaurant_layout/auth/login";
import RestaurantSignup from "@/layouts/restaurant_layout/auth/signup";
import Analytics from "@/pages/restaurant/Dashboard/analytics";
import RestaurantDashboard from "@/pages/restaurant/Dashboard/dashboard";


export const restaurantRoutes = [
    {
        path: "/restaurant",
        children: [
            { path: "login", element: <RestaurantLogin /> },
            { path: "signup", element: <RestaurantSignup /> },
            {
                element: <RestaurantDashboard />, // protected layout after login
                children: [
                  { index: true, element: <Analytics /> },

                ],
            },
        ],
    },
];

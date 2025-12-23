import DeliveryLogin from "@/layouts/delivery_layout/auth/login";
import DeliverySignup from "@/layouts/delivery_layout/auth/signup";
import Analytics from "@/pages/delivery/Dashboard/analytics";
import DeliveryDashboard from "@/pages/delivery/Dashboard/dashboard";


export const deliveryRoutes = [
    {
        path: "/delivery",
        children: [
            { path: "login", element: <DeliveryLogin /> },
            { path: "signup", element: <DeliverySignup /> },
            {
                element: <DeliveryDashboard />, // protected layout after login
                children: [
                  { index: true, element: <Analytics /> },

                ],
            },
        ],
    },
];

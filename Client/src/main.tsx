import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './pages/admin/Dashboard/dashboard.tsx';
import Users from './pages/admin/Users/users.tsx';
import Analytics from './pages/admin/Dashboard/analytics.tsx';
import Restaurant from './pages/admin/restaurant/restaurant.tsx';
import Delivery from './pages/admin/delivery/delivery.tsx';
import Menu from './pages/admin/Menu/menu.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", element: <Dashboard />,
        children: [
          { element: <Analytics />, index: true },
          { path: "/users", element: <Users /> },
          { path: "/restaurant", element: <Restaurant /> },
          { path: "/delivery", element: <Delivery /> },
          { path: "/menu", element: <Menu /> },


        ]
      },


    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

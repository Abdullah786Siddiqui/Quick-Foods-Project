import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./adminRouter";
import { userRoutes } from "./userRouter";
import { deliveryRoutes } from "./deliveryRouter";
import { restaurantRoutes } from "./restaurantRouter";


export const rootRouter = createBrowserRouter([
  ...adminRoutes,
  ...userRoutes,
  ...deliveryRoutes,
  ...restaurantRoutes
]);

import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./adminRouter";
import { userRoutes } from "./userRouter";
import { restaurantRoutes } from "./restaurantRouter";


export const rootRouter = createBrowserRouter([
  ...adminRoutes,
  ...userRoutes,
  ...restaurantRoutes
]);

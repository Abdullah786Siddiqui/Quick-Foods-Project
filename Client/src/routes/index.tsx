import { createBrowserRouter } from "react-router-dom";
import { adminRouter } from "./adminRouter";


export const rootRouter = createBrowserRouter([
  ...adminRouter.routes,
]);

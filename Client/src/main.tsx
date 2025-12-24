import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { rootRouter } from "./routes/index";
import "./App.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(

  
  <>
  
    {/* Toast Notifications */}
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 1000,
      }}
    />
    <RouterProvider router={rootRouter} />
  </>
);

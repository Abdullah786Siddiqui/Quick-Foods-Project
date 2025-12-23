import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { rootRouter } from "./routes/index";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={rootRouter} />
  </StrictMode>
);

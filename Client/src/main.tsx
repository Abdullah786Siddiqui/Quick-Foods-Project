import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { rootRouter } from "./routes/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <>
    {/* Toast Notifications */}
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 1500,
      }}
    />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={rootRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>


  </>
);

import { createBrowserRouter } from "react-router-dom";
import { List, Home, ErrorPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/list",
    element: <List />,
  },
]);

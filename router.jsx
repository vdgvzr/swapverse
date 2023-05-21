import { createBrowserRouter } from "react-router-dom";
import { rootRoute } from "./src/layouts/RootLayout/RootLayout";
import { homeRoute } from "./src/pages/HomePage/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <h1>Error</h1>,
    ...rootRoute,
    children: [
      { index: true, ...homeRoute },
      { path: "*", element: <h1>404 - Page not found</h1> },
    ],
  },
]);

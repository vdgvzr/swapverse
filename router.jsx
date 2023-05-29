import { createBrowserRouter } from "react-router-dom";
import { rootRoute } from "./src/layouts/RootLayout/RootLayout";
import { homeRoute } from "./src/pages/HomePage/HomePage";
import ErrorPage from "./src/pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    ...rootRoute,
    children: [
      { index: true, ...homeRoute },
      { path: "*", element: <h1>404 - Page not found</h1> },
    ],
  },
]);

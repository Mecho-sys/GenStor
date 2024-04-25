import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import Root2 from "./Root2";
import ErrorPage from "./ErrorPage";
import App from "./App";
import Home from "./components/home/Home";
import LoginComp from "./components/login/LoginComp";
import TransformTest from "./components/Transform";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/app",
        element: <App />,
      },
      {
        path: "/editor",
        element: <TransformTest />,
      },
    ],
  },
  {
    path: "/",
    element: <Root2 />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginComp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

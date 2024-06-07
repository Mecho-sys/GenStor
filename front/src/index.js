import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Root from "./Root";
import Root2 from "./Root2";
import ErrorPage from "./ErrorPage";
import Home from "./components/home/Home";
import LoginComp from "./components/login/LoginComp";
import Canvas from "./components/editor/Canvas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root2 />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/editor",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/editor",
        element: <Canvas />,
      },
      {
        path: "/editor/:projectId",
        element: <Canvas />,
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

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import ErrorPage from "./ErrorPage";
import App from "./App";
import Home from "./components/Home";
import LoginComp from "./components/LoginComp";
import TransformTest from "./components/Transform";
import CustomComponent from "./components/Whiteboard";

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
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginComp />,
      },
      {
        path: "/transTest",
        element: <TransformTest />,
      },
      {
        path: "/whiteBoard",
        element: <CustomComponent />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

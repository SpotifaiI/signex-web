import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFound } from "./screens/NotFound.tsx";
import { Login } from "./screens/Login.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <div>Register</div>,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={routes} />;
}

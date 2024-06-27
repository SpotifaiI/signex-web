import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { NotFound } from './screens/NotFound.tsx';
import { Base } from './screens/Base.tsx';
import { Home } from './screens/Home.tsx';
import { Login } from "./screens/Login.tsx";
import { Register } from './screens/Register.tsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Base/>,
    errorElement: <NotFound/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/send',
        element: <div>enviar</div>
      }
    ]
  },
  {
    errorElement: <NotFound/>,
    path: 'login',
    element: <Login />,
  },
  {
    errorElement: <NotFound/>,
    path: 'register',
    element: <Register/>
  },
]);

export function Router() {
  return <RouterProvider router={routes} />;
}

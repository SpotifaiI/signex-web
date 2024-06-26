import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import { NotFound } from './screens/NotFound.tsx';

const routes = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound/>,
    children: [
      {
        index: true,
        element: <div>Home</div>
      },
      {
        path: 'login',
        element: <div>Login</div>
      },
      {
        path: 'register',
        element: <div>Register</div>
      },
    ]
  }
]);

export function Router() {
  return <RouterProvider router={routes}/>
}

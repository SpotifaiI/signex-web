import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { NotFound } from './screens/NotFound.tsx';
import { Base } from './screens/Base.tsx';
import { Home } from './screens/Home.tsx';
import { Login } from "./screens/Login.tsx";
import { Register } from './screens/Register.tsx';
import { Send } from './screens/Send.tsx';
import { Sign } from './screens/Sign.tsx';
import { Redirector } from './components/Redirector.tsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Base/>,
    errorElement: <NotFound/>,
    children: [
      {
        index: true,
        element: (
          <Redirector.ToHome>
            <Home/>
          </Redirector.ToHome>
        )
      },
      {
        path: 'send',
        element: (
          <Redirector.ToHome>
            <Send/>
          </Redirector.ToHome>
        )
      },
      {
        path: 'sign/:hash',
        element: <Sign/>
      }
    ]
  },
  {
    errorElement: <NotFound/>,
    path: 'login',
    element: (
      <Redirector.ToLogin>
        <Login />
      </Redirector.ToLogin>
    ),
  },
  {
    errorElement: <NotFound/>,
    path: 'register',
    element: (
      <Redirector.ToLogin>
        <Register/>
      </Redirector.ToLogin>
    )
  },
]);

export function Router() {
  return <RouterProvider router={routes} />;
}

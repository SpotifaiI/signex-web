import { ToastContainer } from 'react-toastify';

import { Router } from './Router.tsx';
import { AuthProvider } from './contexts/Auth.tsx';

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
      <ToastContainer/>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </>
  )
}

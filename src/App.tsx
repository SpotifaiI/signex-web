import { ToastContainer } from 'react-toastify';

import { Router } from './Router.tsx';

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
      <ToastContainer/>
      <Router/>
    </>
  )
}

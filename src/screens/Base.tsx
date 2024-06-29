import { Outlet } from 'react-router-dom';

import { useAuth } from '../contexts/Auth.tsx';

import '../styles/screens/Base.css';

export function Base() {
  const { user } = useAuth();

  return (
    <div id="base-screen">
      <header>
        <div className="wrapper">
          <span><span>S</span>ignex</span>
          <span>{user?.name ?? ''}</span>
        </div>
      </header>

      <main className="wrapper">
        <Outlet/>
      </main>
    </div>
  );
}

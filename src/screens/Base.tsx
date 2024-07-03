import { LogOut } from 'react-feather';
import { Outlet } from 'react-router-dom';

import { useAuth } from '../contexts/Auth.tsx';
import { ActionButton } from '../components/ActionButton.tsx';

import '../styles/screens/Base.css';

export function Base() {
  const { user, logOut } = useAuth();

  function onLogoutHandler() {
    if (confirm('Confirma logout?')) {
      logOut();
    }
  }

  return (
    <div id="base-screen">
      <header>
        <div className="wrapper">
          <span><span>S</span>ignex</span>

          <ActionButton onClick={onLogoutHandler}>
            {user?.name ?? ''} <LogOut />
          </ActionButton>
        </div>
      </header>

      <main className="wrapper">
        <Outlet/>
      </main>
    </div>
  );
}

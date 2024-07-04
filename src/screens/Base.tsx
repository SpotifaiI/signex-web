import { LogOut } from 'react-feather';
import { Outlet } from 'react-router-dom';

import { ActionButton } from '../components/ActionButton.tsx';
import { useAuth } from '../contexts/Auth.tsx';

import '../styles/screens/Base.css';

export function Base() {
  const { user, logOut, loggedIn } = useAuth();

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

          {loggedIn ? (
            <ActionButton onClick={onLogoutHandler}>
              {user?.name} <LogOut />
            </ActionButton>
          ) : null}
        </div>
      </header>

      <main className="wrapper">
        <Outlet/>
      </main>
    </div>
  );
}

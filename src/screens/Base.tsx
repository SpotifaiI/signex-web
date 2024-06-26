import { Outlet } from 'react-router-dom';

import '../styles/screens/Base.css';

export function Base() {
  return (
    <div id="base-screen">
      <header className="wrapper">
        <span>Signex</span>
        <span>Dia Fragma</span>
      </header>

      <main className="wrapper">
        <Outlet/>
      </main>
    </div>
  );
}

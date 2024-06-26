import { Outlet } from 'react-router-dom';

import '../styles/screens/Base.css';

export function Base() {
  return (
    <div id="base-screen">
      <header>
        <div className="wrapper">
          <span><span>S</span>ignex</span>
          <span>Dia Fragma</span>
        </div>
      </header>

      <main className="wrapper">
        <Outlet/>
      </main>
    </div>
  );
}

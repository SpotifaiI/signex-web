import { Outlet } from 'react-router-dom';

import '../styles/screens/Base.css';

export function Base() {
  return (
    <div>
      <Outlet/>
    </div>
  );
}

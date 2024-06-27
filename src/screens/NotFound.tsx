import { Link } from 'react-router-dom';

import '../styles/screens/NotFound.css';

export function NotFound() {
  return (
    <div id="not-found-screen">
      <span>404</span>
      <span>Ooops... Página não encontrada.</span>
      <Link to="/">Voltar para tela inicial</Link>
    </div>
  );
}

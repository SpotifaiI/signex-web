import { useNavigate } from 'react-router-dom';

import '../styles/screens/Home.css';
import { Title } from '../components/Title.tsx';
import { ActionButton } from '../components/ActionButton.tsx';

export function Home() {
  const navigate = useNavigate();

  function onDeleteHandler() {
    confirm('Confirma a exclusão do envio selecionado?');
  }

  function onAddHandler() {
    navigate('/send');
  }

  return (
    <div id="home-screen">
      <header>
        <Title>Envios</Title>

        <ActionButton onClick={onAddHandler}>
          Adicionar
        </ActionButton>
      </header>

      <div className="sign-list">
        <section className="sign-item">
          <div>
            <span>heurheuheurheuhrasd123rued</span>
            <span>Nome do Arquivo</span>
          </div>

          <button type="button" onClick={onDeleteHandler}>Remover</button>

          <div>
            <span className="signed">contato@contato.com.br</span>
            <span className="signed">contato@contato.com.br</span>
            <span>contato@contato.com.br</span>
            <span>contato@contato.com.br</span>
          </div>
        </section>
      </div>
    </div>
  );
}

import '../styles/screens/Home.css';
import { Title } from '../components/Title.tsx';
import { ActionButton } from '../components/ActionButton.tsx';

export function Home() {
  function onDeleteHandler() {
    confirm('Confirma a exclusão do envio selecionado?');
  }

  return (
    <div id="home-screen">
      <header>
        <Title>Envios</Title>

        <ActionButton onClick={() => {}}>
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

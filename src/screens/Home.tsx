import '../styles/screens/Home.css';
import { Title } from '../components/Title.tsx';
import { ActionButton } from '../components/ActionButton.tsx';

export function Home() {
  return (
    <div id="home-screen">
      <header>
        <Title>Links</Title>

        <ActionButton onChange={() => {}}>
          Adicionar
        </ActionButton>
      </header>
    </div>
  );
}

import { useNavigate, useParams } from 'react-router-dom';

import '../styles/screens/Sign.css';
import { useEffect, useState } from 'react';
import { Title } from '../components/Title.tsx';
import { ActionButton } from '../components/ActionButton.tsx';
import { Image } from 'react-feather';
import { toast } from 'react-toastify';

type SignParams = {
  hash?: string
};

export function Sign() {
  const { hash } = useParams<SignParams>();
  const navigate = useNavigate();
  const [signCode, setSignCode] = useState('');

  useEffect(() => {
    if (!hash) {
      navigate('/');

      return;
    }

    loadSign();
  }, []);

  async function loadSign() {}

  function onSendHandler(): void {
    try {
      const code = prompt(
        'Insira o código que estava no e-mail que continha esse link:'
      );

      if (!code) {
        throw 'Insira um código para realizar a assinatura.';
      }
    } catch (exception) {
      toast.error(<>{exception}</>);
    }
  }

  return (
    <div id="sign-screen">
      <header>
        <Title>Assinar</Title>
      </header>

      <section>
        <object type="application/pdf" data="">
          <Image/>

          <span>Carregando arquivo...</span>
        </object>
      </section>

      <footer>
        <ActionButton onClick={onSendHandler}>
          Assinar
        </ActionButton>
      </footer>
    </div>
  );
}

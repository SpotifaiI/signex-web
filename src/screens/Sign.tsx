import { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Http } from '../api/Http.ts';
import { ActionButton } from '../components/ActionButton.tsx';
import { Title } from '../components/Title.tsx';

import '../styles/screens/Sign.css';

type SignParams = {
  hash?: string;
  signer_id: string;
};

type SignResponse = {
  file: string;
  is_signed: string|null
};

export function Sign() {
  const { hash, signer_id } = useParams<SignParams>();
  const navigate = useNavigate();
  const [file, setFile] = useState('');
  const [isSigned, setSigned] = useState(false);

  const loadSign = useCallback(async () => {
    try {
      toast.loading('Carregando assinatura...');

      const http = new Http();

      const response = await http
        .to(`/sign/search`)
        .post({
          hash,
          signer_id
        });

      if (!response.isOk()) {
        throw response.getMessage();
      }

      const signResponse: SignResponse = response.getData();

      toast.dismiss();

      if (signResponse) {
        setFile(signResponse.file);
        setSigned(signResponse.is_signed === '1');
      }
    } catch (exception) {
      toast.dismiss();
      toast.error(<>{exception}</>);
    }
  }, [hash, signer_id]);

  useEffect(() => {
    if (!hash) {
      navigate('/');

      return;
    }

    loadSign();
  }, [loadSign, hash, navigate]);

  async function onSendHandler() {
    try {
      const code = prompt(
        'Insira o código que estava no e-mail que continha esse link:'
      );

      if (!code) {
        throw 'Insira um código para realizar a assinatura.';
      }

      const http = new Http();

      toast.loading('Concluindo assinatura...');

      const response = await http
        .to(`/sign/finish`)
        .post({
          signer_id,
          code
        });

      if (!response.isOk()) {
        throw response.getMessage();
      }

      toast.dismiss();
      toast.success('Assinatura finalizada.');
      loadSign();
    } catch (exception) {
      toast.dismiss();
      toast.error(<>{exception}</>);
    }
  }

  return (
    <div id="sign-screen">
      <header>
        <Title>Assinar</Title>
      </header>

      <section>
        <object type="application/pdf" data={`${import.meta.env.VITE_API_ENDPOINT}/public/${file}`}>
          <Image/>

          <span>Carregando arquivo...</span>
        </object>
      </section>

      <footer>
        <ActionButton onClick={onSendHandler} disabled={isSigned}>
          {isSigned ? 'Assinatura Concluída!' : 'Assinar'}
        </ActionButton>
      </footer>
    </div>
  );
}

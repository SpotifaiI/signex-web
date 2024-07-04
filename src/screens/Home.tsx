import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Http } from '../api/Http.ts';
import { ActionButton } from '../components/ActionButton.tsx';
import { Title } from '../components/Title.tsx';
import { useAuth } from '../contexts/Auth.tsx';

import '../styles/screens/Home.css';

export type Sign = {
  id: number;
  hash: string;
  file: string;
  signers: Signer[]
};

export type Signer = {
  email: string;
  is_signed?: string;
};

export function Home() {
  const navigate = useNavigate();
  const { user, headers } = useAuth();

  const [signs, setSigns] = useState<Sign[]>([] as Sign[]);

  const loadSigns = useCallback(async () => {
    try {
      toast.loading('Buscando assinaturas...');

      const http = new Http();

      const response = await http
        .to(`/sign/list/${user?.id}`)
        .post({
          token: headers?.token
        });

      if (!response.isOk()) {
        throw response.getMessage();
      }

      toast.dismiss();
      setSigns(response.getData() as Sign[]);
    } catch (exception) {
      toast.dismiss();
      toast.error(<>{exception}</>);
    }
  }, [headers?.token, user?.id]);

  useEffect(() => {
    loadSigns();
  }, [loadSigns]);

  async function onDeleteHandler(signId: number) {
    try {
      if (!confirm(`Confirma a exclusão do envio ${signId} selecionado?`)) {
        return;
      }

      toast.loading('Removendo assinatura...');

      const http = new Http();

      const response = await http
        .to(`/sign/remove/${signId}`)
        .post({
          user: user?.id,
          token: headers?.token
        });

      if (!response.isOk()) {
        throw response.getMessage();
      }

      toast.dismiss();
      await loadSigns();
    } catch (exception) {
      toast.dismiss();
      toast.error(<>{exception}</>);
    }
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
        {signs.map((sign, index) => (
          <section key={index} className="sign-item">
            <div>
              <span>{sign.hash}</span>
              <span>{sign.file}</span>
            </div>

            <button 
              type="button" 
              onClick={() => onDeleteHandler(sign.id)}>
                Remover</button>

            <div>
              {sign.signers.map(signer => (
                <span 
                  className={signer.is_signed ? 'signed' : ''}>
                    {signer.email}</span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

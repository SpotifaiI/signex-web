import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Title } from '../components/Title.tsx';
import { ActionButton } from '../components/ActionButton.tsx';
import { FormInput } from '../components/FormInput.tsx';

import '../styles/screens/Send.css';
import { ArrowLeft, Download, Minus, Plus } from 'react-feather';

type Email = {
  email: string
};

export function Send() {
  const emptyEmail: Email = {
    email: ''
  };

  const navigate = useNavigate();
  const [emails, setEmails] = useState<Email[]>([emptyEmail]);

  function onBackHandler(): void {
    navigate('/');
  }

  function onEmailChange(index: number, value: string): void {
    const changedEmails: Email[] = emails.map((info, key) => {
      if (index === key) {
        info.email = value;
      }

      return info;
    });

    setEmails(changedEmails);
  }

  function onAddHandler(): void {
    setEmails(previous => [...previous, emptyEmail]);
  }

  function onRemoveHandler(index: number): void {
    setEmails(emails
      .filter((_, id) => index !== id));
  }

  return (
    <div id="send-screen">
      <header>
        <ActionButton onClick={onBackHandler}>
          <ArrowLeft size={20}/>
        </ActionButton>
        <Title>Enviar</Title>
      </header>

      <form>
        <section id="send-email-upload">
          <label htmlFor="send-email-upload-file">
            <Download size={20}/>
            <span>Clique para selecionar o arquivo desejado...</span>
          </label>

          <input type="file" hidden id="send-email-upload-file"/>
        </section>

        {emails.map(({ email }, index) => (
          <div key={index} className="send-email-item">
            <FormInput
              label="Destinatário"
              value={email}
              onChange={event =>
                onEmailChange(index, event.target.value)}
              disabled={false}
              placeholder="exemplo@email.com.br"/>

            <div>
              <ActionButton onClick={onAddHandler}>
                <Plus size={20}/>
              </ActionButton>
              <ActionButton onClick={() => onRemoveHandler(index)}>
                <Minus size={20}/>
              </ActionButton>
            </div>
          </div>
        ))}
      </form>

      <footer>

      </footer>
    </div>
  );
}

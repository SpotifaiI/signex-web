import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, Download, Image, Minus, Plus } from 'react-feather';

import { Title } from '../components/Title.tsx';
import { ActionButton } from '../components/ActionButton.tsx';
import { FormInput } from '../components/FormInput.tsx';

import '../styles/screens/Send.css';

type Email = {
  email: string
};

export function Send() {
  const emptyEmail: Email = {
    email: ''
  };

  const navigate = useNavigate();
  const [emails, setEmails] = useState<Email[]>([emptyEmail]);
  const [doc, setDoc] = useState<File>();
  const [docPreview, setDocPreview] = useState('');
  const [hasEmailsToSent, setHasEmailsToSent] = useState(false);

  function onBackHandler(): void {
    navigate('/');
  }

  function onEmailChange(index: number, value: string): void {
    let hasFilledEmail = false;

    const changedEmails: Email[] = emails.map((info, key) => {
      if (index === key) {
        info.email = value;
      }

      if (info.email) {
        hasFilledEmail = true;
      }

      return info;
    });

    setHasEmailsToSent(hasFilledEmail);
    setEmails(changedEmails);
  }

  function onDocInsert(event: ChangeEvent<HTMLInputElement>): void {
    try {
      if (!event.target.files) {
        return;
      }

      const file = event.target?.files[0];

      if (!file) {
        throw 'Arquivo inválido para upload!';
      }

      if ((file!.type ?? '') !== 'application/pdf') {
        throw 'Apenas arquivos PDF são permitidos!';
      }

      setDoc(file);
      setDocPreview(URL.createObjectURL(file));
    } catch (exception) {
      toast.error(<>{exception}</>);
    }
  }

  function onAddHandler(): void {
    setEmails(previous => [...previous, emptyEmail]);
  }

  function onRemoveHandler(index: number): void {
    if (emails.length === 1) {
      return;
    }

    setEmails(emails
      .filter((_, id) => index !== id));
  }

  function onSubmitHandler(): void {
    try {
      if (!doc) {
        throw 'Insira um arquivo para prosseguir.';
      }

      if (!hasEmailsToSent) {
        throw 'Insira pelo menos um e-mail para a solicitação.';
      }
    } catch (exception) {
      toast.error(<>{exception}</>);
    }
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
        <header className="send-email-upload">
          <object type="application/pdf" data={docPreview}>
            <Image />
          </object>
        </header>

        <section className="send-email-upload">
          <label htmlFor="send-email-upload-file">
            <Download size={20}/>
            <span>Clique para selecionar um arquivo PDF...</span>
          </label>

          <input
            type="file"
            hidden
            id="send-email-upload-file"
            onChange={onDocInsert}/>
        </section>

        <div>
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
        </div>
      </form>

      <footer>
        <ActionButton onClick={onSubmitHandler}>
          Enviar Solicitação de Assinatura
        </ActionButton>
      </footer>
    </div>
  );
}

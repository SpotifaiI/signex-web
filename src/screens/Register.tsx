import { useState } from 'react';
import { toast } from 'react-toastify';

import { FormInput } from '../components/FormInput.tsx';
import { ActionButton } from '../components/ActionButton.tsx';

import '../styles/shared/LoginRegister.css';

export function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  function onRegisterHandler() {
    try {
      if (!name || !email || !password || !confPassword) {
        throw 'Campos obrigatórios para cadastro.';
      }

      if (password !== confPassword) {
        throw 'As senhas inseridas não conferem.';
      }
    } catch (exception) {
      toast.error(exception);
    }
  }

  return (
    <div id="register-screen" className="login-register-shared">
      <div className="login-wrapper">
        <header>
          <span><span>S</span>ignex</span>
        </header>

        <form>
          <div>
            <FormInput
              label="Nome Completo"
              value={name}
              onChange={event => setName(event.target.value)}
              disabled={false}/>
            <FormInput
              label="E-mail"
              type="email"
              placeholder="email@exemplo.com.br"
              value={email}
              onChange={event => setEmail(event.target.value)}
              disabled={false}/>
            <FormInput
              label="Senha"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              disabled={false}/>
            <FormInput
              label="Confirme a Senha"
              type="password"
              value={confPassword}
              onChange={event => setConfPassword(event.target.value)}
              disabled={false}/>
          </div>

          <ActionButton onClick={onRegisterHandler}>
            Cadastrar
          </ActionButton>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { toast } from 'react-toastify';

import { Http } from '../api/Http.ts';
import { FormInput } from '../components/FormInput.tsx';
import { ActionButton } from '../components/ActionButton.tsx';
import { LoginResponse } from './Login.tsx';

import '../styles/shared/LoginRegister.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth.tsx';

export function Register() {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const http = new Http();

  async function onRegisterHandler() {
    try {
      if (!name || !email || !password || !confPassword) {
        throw 'Campos obrigatórios para cadastro.';
      }

      if (password !== confPassword) {
        throw 'As senhas inseridas não conferem.';
      }

      toast.loading('Realizando cadastro...');

      const response = await http.to('/user/create').post({
        email, name, password
      });

      if (!response.isOk()) {
        throw response.getMessage();
      }

      toast.dismiss();
      toast.loading('Redirecionando...');

      const login = await http.to('/user/login').post({
        email, password
      });

      if (!response.isOk()) {
        throw response.getMessage();
      }

      toast.dismiss();

      const data: LoginResponse = response.getData();

      logIn(data.token, {
        name: data.name,
        email: data.email,
        id: data.user
      });
      navigate('/', { replace: true });
    } catch (exception) {
      toast.dismiss();
      toast.error(<>{exception}</>);
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

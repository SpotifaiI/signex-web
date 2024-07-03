import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Http } from '../api/Http.ts';
import { useAuth } from '../contexts/Auth.tsx';
import { ActionButton } from '../components/ActionButton.tsx';
import { FormInput } from '../components/FormInput.tsx';

import '../styles/screens/Login.css';
import '../styles/shared/LoginRegister.css';

export type LoginResponse = {
  token: string;
  user: number;
  email: string;
  name: string;
};

export function Login() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const http = new Http();

  async function onLoginHandler() {
    try {
      if (!email || !password) {
        throw 'Campos obrigatórios para login.';
      }

      toast.loading('Realizando cadastro...');

      const response = await http.to('/user/login').post({
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
    <div id="login-screen" className="login-register-shared">
      <div className="login-wrapper">
        <header>
          <span><span>S</span>ignex</span>
        </header>

        <form>
          <div>
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
          </div>

          <ActionButton onClick={onLoginHandler}>
            Entrar
          </ActionButton>
        </form>

        <footer>
          <span>
            Ainda não possui uma conta? <Link to="/register">Crie agora</Link>.
          </span>
        </footer>
      </div>
    </div>
  );
}

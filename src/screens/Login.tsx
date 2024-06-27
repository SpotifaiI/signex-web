import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ActionButton } from '../components/ActionButton.tsx';
import { FormInput } from '../components/FormInput.tsx';

import '../styles/screens/Login.css';
import '../styles/shared/LoginRegister.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onLoginHandler() {}

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

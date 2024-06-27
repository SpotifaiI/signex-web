import { useState } from 'react';
import { ActionButton } from '../components/ActionButton.tsx';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onLoginHandler() {}

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <form className="login-form">
          <input/>
          <ActionButton onClick={onLoginHandler}>
            Entrar
          </ActionButton>
        </form>
      </div>
    </div>
  );
}

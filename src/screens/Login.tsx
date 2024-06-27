import { useState } from 'react';
import { ActionButton } from '../components/ActionButton.tsx';
import { FormInput } from '../components/FormInput.tsx';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onLoginHandler() {}

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <form className="login-form">
          <FormInput
            label="E-mail"
            type="email"
            value={2}
            onChange={(event) => {}}
            disabled={false}/>

          <ActionButton onClick={onLoginHandler}>
            Entrar
          </ActionButton>
        </form>
      </div>
    </div>
  );
}

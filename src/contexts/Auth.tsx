import {
  createContext,
  PropsWithChildren,
  useContext, useEffect,
  useState
} from 'react';

export type User = {
  name: string;
  email: string;
}

export type AuthContextProps = {
  loggedIn: boolean;
  user: User|null;
};

export type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    setUser({
      email: 'contato@contato.com.br',
      name: 'Contato'
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      loggedIn: !!user,
      user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

import {
  createContext,
  PropsWithChildren,
  useContext, useEffect,
  useState
} from 'react';

export type User = {
  id: number;
  name: string;
  email: string;
}

export type AuthHeadersProps = {
  token: string;
}

export type AuthContextProps = {
  loggedIn: boolean;
  user: User|null;
  headers: AuthHeadersProps|null;
  logIn: (token: string, user: User) => void;
  logOut: () => void;
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
  const [headers, setHeaders] = useState<AuthHeadersProps|null>(null);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('signex@user');
    const sessionToken = sessionStorage.getItem('signex@token');

    if (sessionUser && sessionToken) {
      setUser((JSON.parse(sessionUser)) as User);
      setHeaders({
        token: sessionToken
      });
    }
  }, []);

  function logIn(token: string, user: User) {
    setUser(user);
    setHeaders({
      token
    });

    sessionStorage.setItem('signex@user', JSON.stringify(user));
    sessionStorage.setItem('signex@token', token);
  }

  function logOut() {
    setUser(null);
    setHeaders(null);

    sessionStorage.removeItem('signex@user');
    sessionStorage.removeItem('signex@token');
  }

  return (
    <AuthContext.Provider value={{
      loggedIn: !!user,
      user,
      headers,
      logIn,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

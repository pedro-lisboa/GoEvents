import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  name: string;
}

interface AuthContextState {
  name: string;
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoEvents/token');

    const user = localStorage.getItem('@GoEvents/user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {

    console.log({
      email,
      password,
    });
    const response = await api.post('/sessions', {
      email,
      password,
    });
    console.log(response.data);
    const { token, user } = response.data;

    localStorage.setItem('@GoEvents/token', token);

    localStorage.setItem('@GoEvents/user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setAuthData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoEvents/token');
    localStorage.removeItem('@GoEvents/user');
    console.log("logout");

    setAuthData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoEvents/user', JSON.stringify(user));
      setAuthData({
        token: authData.token,
        user,
      });
    },
    [setAuthData, authData.token]
  );

  return (
    <AuthContext.Provider
      value={{
        name: 'diego',
        user: authData.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextState {
  const authState = useContext(AuthContext);

  if (!authState) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authState;
}

import React, { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { API_BASE_URL } from '@/constants/api';

type User = {
  email: string;
  name: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (email: string, password: string, name?: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  token: null,
  login: async () => ({ ok: false }),
  register: async () => ({ ok: false }),
  logout: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        return { ok: false, error: body?.detail ?? 'Login failed' };
      }

      const data = await res.json();
      setToken(data.access_token);
      setUser(data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Could not connect to server' };
    }
  };

  const register = async (
    email: string,
    password: string,
    name?: string,
  ): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: name ?? '' }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        return { ok: false, error: body?.detail ?? 'Registration failed' };
      }

      const data = await res.json();
      setToken(data.access_token);
      setUser(data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Could not connect to server' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import React, { createContext, useContext, useState, type PropsWithChildren } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulated login — replace with real API call
    if (email && _password) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('movieClubUser');
    return stored ? JSON.parse(stored) : null;
  });

  const [jwt, setJwt] = useState(() => localStorage.getItem('movieClubToken') || '');

  useEffect(() => {
    if (user) {
      localStorage.setItem('movieClubUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('movieClubUser');
    }
  }, [user]);

  useEffect(() => {
    if (jwt) {
      localStorage.setItem('movieClubToken', jwt);
    } else {
      localStorage.removeItem('movieClubToken');
    }
  }, [jwt]);

  const login = (nextUser, token) => {
    setUser(nextUser);
    setJwt(token || '');
  };

  const logout = () => {
    setUser(null);
    setJwt('');
  };

  const signup = (nextUser, token) => {
    setUser(nextUser);
    setJwt(token || '');
  };

  const value = useMemo(() => ({ user, jwt, login, logout, signup }), [user, jwt]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

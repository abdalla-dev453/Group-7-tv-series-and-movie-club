import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

const TOKEN_KEY = 'reelclub_token';
const USER_KEY = 'reelclub_user';

const saveSession = (data, fallbackUser) => {
  const accessToken = data.access_token || data.token || data.accessToken;
  const authenticatedUser = data.user || fallbackUser;

  if (!accessToken) throw new Error('Login response did not include a token');

  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));
  return { accessToken, authenticatedUser };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await authService.login(email, password);
    const session = saveSession(data, { email });
    setToken(session.accessToken);
    setUser(session.authenticatedUser);
    return session.authenticatedUser;
  };

  const signup = async (payload) => {
    const { data } = await authService.signup(payload);
    const session = saveSession(data, payload);
    setToken(session.accessToken);
    setUser(session.authenticatedUser);
    return session.authenticatedUser;
  };

  const logout = async () => {
    try {
      // Blocklists the JWT server-side (see backend fix 2.3) —
      // clearing localStorage alone would leave the token valid until expiry.
      await authService.logout();
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

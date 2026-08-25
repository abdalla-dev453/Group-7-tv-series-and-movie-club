import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import { TOKEN_KEY, USER_KEY } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (!storedToken || !storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser || typeof parsedUser !== 'object' || !parsedUser.id) {
        throw new Error('Invalid stored session');
      }

      setToken(storedToken);
      setUser(parsedUser);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const { data } = await authService.login({ username, password });
    setToken(data.access_token);
    setUser(data.user);
    localStorage.setItem(TOKEN_KEY, data.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data.user;
  };

  const signup = async (payload) => {
    const { data } = await authService.signup(payload);
    const session = saveSession(data); // no fallback to the raw signup form
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

  const updateStoredUser = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, updateStoredUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

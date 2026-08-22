import api from './api';

export const signup = (payload) => api.post('/signup', payload);

export const login = (email, password) => api.post('/login', { email, password });

// Hits the backend blocklist (fix 2.3) — not just a local token clear.
export const logout = () => api.post('/logout');

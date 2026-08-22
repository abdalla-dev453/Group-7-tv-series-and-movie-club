import api from './api';

export const signup = async (payload) => api.post('/signup', payload);

export const login = async (payload) => api.post('/login', payload);

// Hits the backend blocklist (fix 2.3) — not just a local token clear.
export const logout = async () => api.post('/logout');

export const getCurrentUser = async () => api.get('/current-user');
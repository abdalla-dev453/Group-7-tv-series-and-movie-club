import api from './api';

export const signup = async (payload) => api.post('/api/auth/signup', payload);

export const login = async (username, password) => api.post('/api/auth/login', { username, password });
export const logout = async () => api.post('/api/auth/logout');

import api from './api';

export const signup = async (payload) => api.post('/signup', payload);

export const login = async (email, password) => api.post('/login', { email, password });
export const logout = async () => api.post('/logout');

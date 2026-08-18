import api from './api.js';

export const signup = async (payload) => api.post('/signup', payload);
export const login = async (payload) => api.post('/login', payload);
export const logout = async () => api.post('/logout');

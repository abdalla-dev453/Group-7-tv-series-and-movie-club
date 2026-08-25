import api from './api';

export const signup = (payload) => api.post('/signup', payload);

export const login = (payload) => api.post('/login', payload);
export const logout = () => api.post('/logout');

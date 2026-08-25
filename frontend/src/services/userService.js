import api from './api';

export const getProfile = (id, config) => api.get(`/users/${id}`, config);
export const updateProfile = async (id, data) => api.put(`/users/${id}`, data);
export const getUsers = (page = 1, limit = 10, signal) => api.get('/users', { params: { page, limit }, signal });

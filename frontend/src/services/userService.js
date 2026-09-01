import api from './api';

export const getProfile = (id) => api.get(`/api/users/${id}`);

export const updateProfile = (id, data) => api.put(`/api/users/${id}`, data);

export const getUsers = (page = 1, perPage = 6, query = '') =>
	api.get('/api/users', { params: { page, perPage, query } });

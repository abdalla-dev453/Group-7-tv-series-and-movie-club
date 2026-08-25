import api from './api';

export const getProfile = (id) => api.get(`/users/${id}`);

export const updateProfile = (id, data) => api.put(`/users/${id}`, data);

export const getUsers = (page = 1, perPage = 6) =>
	api.get('/users', { params: { page, perPage } });

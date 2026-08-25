import api from './api.js';

export const getProfile = (id, config) => api.get(`/users/${id}`, config);
export const updateProfile = async (id, data) => api.put(`/users/${id}`, data);

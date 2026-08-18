import api from './api.js';

export const getProfile = async (id) => api.get(`/users/${id}`);
export const updateProfile = async (id, data) => api.put(`/users/${id}`, data);

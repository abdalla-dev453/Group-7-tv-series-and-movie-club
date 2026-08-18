import api from './api.js';

export const getClubs = async (page = 1, perPage = 10) => api.get('/clubs', { params: { page, perPage } });
export const getClub = async (id) => api.get(`/clubs/${id}`);
export const createClub = async (data) => api.post('/clubs', data);
export const updateClub = async (id, data) => api.put(`/clubs/${id}`, data);
export const deleteClub = async (id) => api.delete(`/clubs/${id}`);
export const joinClub = async (id) => api.post(`/clubs/${id}/join`);
export const leaveClub = async (id) => api.delete(`/clubs/${id}/leave`);

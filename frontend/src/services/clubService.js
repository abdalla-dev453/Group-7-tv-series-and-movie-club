import api from './api.js';

export const getClubs = (page = 1, perPage = 20, signal) => api.get('/clubs', { params: { page, per_page: perPage }, signal });
export const getClub = (id, signal) => api.get(`/clubs/${id}`, { signal });
export const createClub = async (data) => api.post('/clubs', data);
export const updateClub = async (id, data) => api.put(`/clubs/${id}`, data);
export const joinClub = async (id) => api.post(`/clubs/${id}/join`);
export const leaveClub = async (id) => api.delete(`/clubs/${id}/leave`);
export const getClubMembers = (id, signal) => api.get(`/clubs/${id}/members`, { signal });

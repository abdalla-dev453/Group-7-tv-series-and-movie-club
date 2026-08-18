import api from './api.js';

export const getWatched = async (userId) => api.get(`/users/${userId}/watched`);
export const logWatched = async (data) => api.post('/watched', data);
export const deleteWatched = async (id) => api.delete(`/watched/${id}`);

import api from './api.js';

export const getWatched = async () => api.get('/api/watched');
export const logWatched = async (data) => api.post('/api/watched', data);
export const deleteWatched = async (id) => api.delete(`/api/watched/${id}`);

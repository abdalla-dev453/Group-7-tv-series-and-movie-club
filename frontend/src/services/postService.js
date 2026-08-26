import api from './api.js';

export const getFeed = async (page = 1, perPage = 10) => api.get('/api/posts', { params: { page, perPage } });
export const getPost = async (id) => api.get(`/api/posts/${id}`);
export const createPost = async (data) => api.post('/api/posts', data);
export const deletePost = async (id) => api.delete(`/api/posts/${id}`);

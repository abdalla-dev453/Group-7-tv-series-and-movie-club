import api from './api.js';

export const getFeed = (page = 1, perPage = 20, signal) => api.get('/posts', { params: { page, per_page: perPage }, signal });
export const getPost = (id, signal) => api.get(`/posts/${id}`, { signal });
export const createPost = async (data) => api.post('/posts', data);
export const deletePost = async (id) => api.delete(`/posts/${id}`);

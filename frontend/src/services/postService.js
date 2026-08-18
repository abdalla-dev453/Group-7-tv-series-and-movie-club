import api from './api.js';

export const getFeed = async (page = 1, perPage = 10) => api.get('/posts', { params: { page, perPage } });
export const getPost = async (id) => api.get(`/posts/${id}`);
export const createPost = async (data) => api.post('/posts', data);
export const deletePost = async (id) => api.delete(`/posts/${id}`);

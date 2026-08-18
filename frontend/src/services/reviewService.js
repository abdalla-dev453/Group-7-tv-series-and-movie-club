import api from './api.js';

export const getReviewsForPost = async (postId) => api.get(`/posts/${postId}/reviews`);
export const createReview = async (postId, data) => api.post(`/posts/${postId}/reviews`, data);
export const updateReview = async (id, data) => api.put(`/reviews/${id}`, data);
export const deleteReview = async (id) => api.delete(`/reviews/${id}`);

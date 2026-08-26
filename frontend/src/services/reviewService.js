import api from './api';

export const getReviewsForPost = (postId) => api.get(`/api/posts/${postId}/reviews`);

export const createReview = (data) => api.post('/api/reviews', data);

// Reviews are now editable this avoids delete+recreate losing history
export const updateReview = (id, data) => api.put(`/api/reviews/${id}`, data);

export const deleteReview = (id) => api.delete(`/reviews/${id}`);

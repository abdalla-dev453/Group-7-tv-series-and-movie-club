import api from './api';

export const getReviewsForPost = (postId) => api.get(`/posts/${postId}/reviews`);

export const createReview = (data) => api.post('/reviews', data);

// Reviews are now editable this avoids delete+recreate losing history
export const updateReview = (id, data) => api.put(`/reviews/${id}`, data);

export const deleteReview = (id) => api.delete(`/reviews/${id}`);

import api from './api';

export const getReview = (id, signal) => api.get(`/reviews/${id}`, { signal });
export const getReviewsForPost = (postId, signal) => api.get('/reviews', { params: { post_id: postId }, signal });
export const createReview = ({ postId, rating, commentText }) => api.post('/reviews', {
  post_id: Number(postId),
  rating: Number(rating),
  comment_text: commentText || null,
});
export const updateReview = async (id, data) => api.put(`/reviews/${id}`, data);
export const deleteReview = async (id) => api.delete(`/reviews/${id}`);

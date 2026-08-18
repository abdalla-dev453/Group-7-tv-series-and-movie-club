import api from './api.js';

export const followUser = async (id) => api.post(`/users/${id}/follow`);
export const unfollowUser = async (id) => api.delete(`/users/${id}/follow`);
export const getFollowers = async (id) => api.get(`/users/${id}/followers`);
export const getFollowing = async (id) => api.get(`/users/${id}/following`);

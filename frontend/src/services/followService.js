import api from './api.js';

export const followUser = async (id) => api.post(`/api/users/${id}/follow`);
export const unfollowUser = async (id) => api.delete(`/api/users/${id}/unfollow`);
export const getFollowers = async (id) => api.get(`/api/users/${id}/followers`);
export const getFollowing = async (id) => api.get(`/api/users/${id}/following`);
export const getMutual = async (id) => api.get(`/api/users/${id}/mutual`);

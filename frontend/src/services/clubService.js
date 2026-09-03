import api from './api.js';

export const getPublicClubs = (page = 1, perPage = 6) =>
  api.get('/api/clubs/public', { params: { page, perPage } });

export const getClubs = async (page = 1, perPage = 10) =>
  api.get('/api/clubs', {
    params: { page, perPage },
  });

export const getClub = async (id) =>
  api.get(`/api/clubs/${id}`);

export const createClub = async (data) =>
  api.post('/api/clubs', data);

export const updateClub = async (id, data) =>
  api.put(`/api/clubs/${id}`, data);

export const deleteClub = async (id) =>
  api.delete(`/api/clubs/${id}`);

export const joinClub = async (id) =>
  api.post(`/api/clubs/${id}/join`);

export const leaveClub = async (id) =>
  api.delete(`/api/clubs/${id}/leave`);

export const getClubMembers = async (id) =>
  api.get(`/api/clubs/${id}/members`);

export const getClubMessages = async (clubId) =>
  api.get(`/api/clubs/${clubId}/messages`);

export const createClubMessage = async (clubId, message) =>
  api.post(`/api/clubs/${clubId}/messages`, { message });

export const deleteClubMessage = async (clubId, messageId) =>
  api.delete(`/api/clubs/${clubId}/messages/${messageId}`);

// Admin actions
export const updateMemberRole = async (clubId, userId, role) =>
  api.put(`/api/clubs/${clubId}/members/${userId}`, {
    role,
  });

export const removeClubMember = async (clubId, userId) =>
  api.delete(`/api/clubs/${clubId}/members/${userId}`);
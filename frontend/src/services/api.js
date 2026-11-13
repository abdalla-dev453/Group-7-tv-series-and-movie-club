import axios from 'axios';

export const TOKEN_KEY = 'reelclub_token';
export const USER_KEY = 'reelclub_user';

const configuredApiUrl = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL;
const apiBaseUrl = (configuredApiUrl || 'https://series-movies-club-backend.onrender.com').replace(/\/$/, '');

const api = axios.create({
  baseURL: apiBaseUrl,
});

// Attach the JWT to every outgoing request, if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('reelclub_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
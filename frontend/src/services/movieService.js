import api from './api.js';

export const searchMovies = (query, signal) =>
  api.get('/api/movies/search', { params: { query }, signal });

export const getMovie = (tmdbId, signal) =>
  api.get(`/api/movies/${tmdbId}`, { signal });

export const getTrendingMovies = (signal) =>
  api.get('/api/movies/trending', { signal });

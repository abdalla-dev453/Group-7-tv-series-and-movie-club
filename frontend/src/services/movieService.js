import api from './api';

// Both endpoints proxy through our own backend (movies.py) — the TMDB API
// key stays server-side, never ships to the browser.

export const searchMovies = (query) =>
  api.get('/api/movies/search', { params: { query } });

export const getMovie = (tmdbId) => api.get(`/api/movies/${tmdbId}`);

export const getTrendingMovies = () => api.get('/api/movies/trending');

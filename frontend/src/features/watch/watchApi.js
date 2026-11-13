import api from '../../services/api';

export const getMovieWatch = (tmdbId, config = {}) =>
  api.get(`/api/movies/${tmdbId}/watch`, config);

export const getMovieWatchProviders = (tmdbId, country, config = {}) =>
  api.get(`/api/movies/${tmdbId}/watch/providers`, {
    ...config,
    params: { ...config.params, country },
  });

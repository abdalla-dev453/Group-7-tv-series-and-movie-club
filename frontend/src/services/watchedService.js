import api from './api.js';

export const getWatched = (signal) => api.get('/watched', { signal });
export const logWatched = ({ movieTitle, watchedDate, personalRating, notes }) => api.post('/watched', {
  movie_title: movieTitle,
  watched_date: watchedDate || null,
  personal_rating: personalRating ? Number(personalRating) : null,
  notes: notes || null,
});
export const deleteWatched = async (id) => api.delete(`/watched/${id}`);

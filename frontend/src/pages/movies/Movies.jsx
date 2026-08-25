import { useState } from 'react';
import MovieSearch from '../../components/movies/MovieSearch';
import MovieCard from '../../components/movies/MovieCard';

// Browse/search page — searching adds results to a running grid so the
// person can search a few titles in a row without losing earlier results.
function Movies() {
  const [found, setFound] = useState([]);

  const handleSelect = (movie) => {
    setFound((prev) => (prev.some((m) => m.tmdb_id === movie.tmdb_id) ? prev : [movie, ...prev]));
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2>Browse movies</h2>
      <div style={{ maxWidth: 420, marginBottom: 24 }}>
        <MovieSearch onSelect={handleSelect} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {found.map((movie) => (
          <MovieCard key={movie.tmdb_id} movie={movie} />
        ))}
      </div>

      {found.length === 0 && (
        <p style={{ color: 'var(--text-dim)' }}>Search for a title to get started.</p>
      )}
    </div>
  );
}

export default Movies;

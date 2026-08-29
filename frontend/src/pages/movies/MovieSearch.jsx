import { useState } from 'react';
import api from '../../services/api';

function MovieSearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await api.get('/api/movies/search', {
        params: { query: trimmedQuery },
      });

      setResults(data?.items || []);
    } catch (err) {
      console.error('Movie search failed:', err);

      setResults([]);
      setError(
        err.response?.data?.error ||
        'Unable to search movies. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const selectMovie = (movie) => {
    onSelect?.(movie);
    setQuery(movie.title);
    setResults([]);
  };

  return (
    <div className="movie-search">
      <form onSubmit={searchMovies}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a movie..."
            aria-label="Search for a movie"
          />

          <button
            type="submit"
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <p
          className="error-message"
          role="alert"
          style={{ marginTop: '8px' }}
        >
          {error}
        </p>
      )}

      {results.length > 0 && (
        <div
          style={{
            marginTop: '10px',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {results.map((movie) => (
            <button
              key={movie.tmdb_id}
              type="button"
              onClick={() => selectMovie(movie)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                border: 'none',
                borderBottom: '1px solid var(--border)',
                background: 'transparent',
                color: 'inherit',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {movie.poster_url && (
                <img
                  src={movie.poster_url}
                  alt=""
                  style={{
                    width: '40px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              )}

              <div>
                <strong>{movie.title}</strong>

                {movie.year && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-dim)',
                    }}
                  >
                    {movie.year}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
import { useState, useEffect, useRef } from 'react';
import theme from '../../theme';
import { searchMovies } from '../../services/movieService';


const styles = {
  wrap: {
    position: 'relative',
    width: '100%',
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 12px',
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.color.coalBorder}`,
    background: theme.color.coalCard,
    color: theme.color.text,
    fontSize: 14,
    outline: 'none',
  },

  results: {
    position: 'absolute',
    top: '110%',
    left: 0,
    right: 0,
    background: theme.color.coalCard,
    border: `1px solid ${theme.color.coalBorder}`,
    borderRadius: theme.radius.sm,
    maxHeight: 280,
    overflowY: 'auto',
    zIndex: 10,
    boxShadow: theme.shadow.card,
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 10px',
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.color.coalBorder}`,
  },

  poster: {
    width: 32,
    height: 48,
    objectFit: 'cover',
    borderRadius: 4,
    background: theme.color.coalSoft,
    flexShrink: 0,
  },

  title: {
    fontSize: 14,
    color: theme.color.text,
    fontWeight: 600,
  },

  year: {
    fontSize: 12,
    color: theme.color.textDim,
    marginTop: 3,
  },

  message: {
    padding: 10,
    fontSize: 13,
    color: theme.color.textDim,
  },

  error: {
    padding: 10,
    fontSize: 13,
    color: '#ef4444',
  },
};

function MovieSearch({
  onSelect,
  placeholder = 'Search for a movie or show',
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Keeps track of the latest request
  const requestIdRef = useRef(0);

  useEffect(() => {
    const trimmedQuery = query.trim();

    // Empty search
    if (!trimmedQuery) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      setError('');
      return;
    }

    const currentRequestId = ++requestIdRef.current;

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const res = await searchMovies(trimmedQuery);

        // Ignore results from an old request
        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        const items = res?.data?.items || [];

        setResults(items);
        setOpen(true);
      } catch (err) {
        // Ignore errors from an old request
        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        console.error('Movie search failed:', err);

        setResults([]);
        setOpen(true);
        setError('Unable to search movies. Please try again.');
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  const handleSelect = (movie) => {
    if (!movie) return;

    onSelect?.(movie);

    setQuery(movie.title || '');
    setOpen(false);
    setError('');
  };

  return (
    <div style={styles.wrap}>
      <input
        style={styles.input}
        type="search"
        value={query}
        placeholder={placeholder}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => {
          if (results.length > 0 || error) {
            setOpen(true);
          }
        }}
        aria-label="Search for a movie or TV show"
      />

      {open && (
        <div style={styles.results}>
          {loading && (
            <div style={styles.message}>
              Searching...
            </div>
          )}

          {!loading && error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            results.length === 0 && (
              <div style={styles.message}>
                No matches found.
              </div>
            )}

          {!loading &&
            !error &&
            results.map((movie) => (
              <div
                key={movie.tmdb_id}
                style={styles.item}
                onClick={() => handleSelect(movie)}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background =
                    theme.color.coalSoft;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background =
                    'transparent';
                }}
              >
                {movie.poster_url ? (
                  <img
                    src={movie.poster_url}
                    alt={movie.title || 'Movie poster'}
                    style={styles.poster}
                  />
                ) : (
                  <div
                    style={{
                      ...styles.poster,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                    }}
                  >
                    🎬
                  </div>
                )}

                <div>
                  <div style={styles.title}>
                    {movie.title || 'Untitled'}
                  </div>

                  {movie.year && (
                    <div style={styles.year}>
                      {movie.year}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
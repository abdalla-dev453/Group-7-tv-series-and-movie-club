import { useState, useEffect, useRef } from 'react';
import { searchMovies } from '../../services/movieService';

const styles = {
  wrap: { position: 'relative' },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: 'var(--text)',
  },
  results: {
    position: 'absolute',
    top: '110%',
    left: 0,
    right: 0,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    maxHeight: 280,
    overflowY: 'auto',
    zIndex: 10,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 10px',
    cursor: 'pointer',
  },
  poster: { width: 32, height: 48, objectFit: 'cover', borderRadius: 4, background: 'var(--surface-raised)' },
  title: { fontSize: 14 },
  year: { fontSize: 12, color: 'var(--text-dim)' },
};

// Debounced TMDB search-as-you-type. Calls onSelect({ tmdb_id, title, year, poster_url })
// when a result is picked — the caller decides what to do with it (e.g. attach to a post draft).
function MovieSearch({ onSelect, placeholder = 'Search for a movie or show' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchMovies(query);
        setResults(res.data.items);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelect = (movie) => {
    onSelect(movie);
    setQuery(movie.title);
    setOpen(false);
  };

  return (
    <div style={styles.wrap}>
      <input
        style={styles.input}
        type="search"
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
      />
      {open && (
        <div style={styles.results}>
          {loading && <div style={{ padding: 10, fontSize: 13, color: 'var(--text-dim)' }}>Searching...</div>}
          {!loading && results.length === 0 && (
            <div style={{ padding: 10, fontSize: 13, color: 'var(--text-dim)' }}>No matches</div>
          )}
          {results.map((movie) => (
            <div key={movie.tmdb_id} style={styles.item} onClick={() => handleSelect(movie)}>
              {movie.poster_url ? (
                <img src={movie.poster_url} alt="" style={styles.poster} />
              ) : (
                <div style={styles.poster} />
              )}
              <div>
                <div style={styles.title}>{movie.title}</div>
                <div style={styles.year}>{movie.year}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieSearch;

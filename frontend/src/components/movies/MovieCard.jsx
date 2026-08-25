import { Link } from 'react-router-dom';

const styles = {
  card: { display: 'block', width: 140 },
  poster: {
    width: '100%',
    aspectRatio: '2 / 3',
    objectFit: 'cover',
    borderRadius: 8,
    background: 'var(--surface-raised)',
    border: '1px solid var(--border)',
  },
  title: { fontSize: 13, marginTop: 6, fontWeight: 600 },
  year: { fontSize: 11, color: 'var(--text-dim)' },
};

// Expects a movie object shaped like a TMDB search/detail result:
// { tmdb_id, title, year, poster_url }
function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.tmdb_id}`} style={styles.card}>
      {movie.poster_url ? (
        <img src={movie.poster_url} alt={movie.title} style={styles.poster} />
      ) : (
        <div style={styles.poster} />
      )}
      <div style={styles.title}>{movie.title}</div>
      <div style={styles.year}>{movie.year}</div>
    </Link>
  );
}

export default MovieCard;

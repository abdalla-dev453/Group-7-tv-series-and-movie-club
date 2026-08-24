import MovieRating from './MovieRating';

const styles = {
  wrap: { display: 'flex', gap: 24, flexWrap: 'wrap' },
  poster: { width: 220, borderRadius: 10, border: '1px solid var(--border)' },
  info: { flex: 1, minWidth: 260 },
  title: { fontSize: 26, fontFamily: 'var(--font-display)', margin: '0 0 6px' },
  meta: { color: 'var(--text-dim)', fontSize: 14, marginBottom: 10 },
  genres: { display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' },
  genreTag: { fontSize: 11, border: '1px solid var(--amber-dim)', color: 'var(--amber)', borderRadius: 6, padding: '2px 8px' },
  overview: { lineHeight: 1.6, marginBottom: 20 },
  castRow: { display: 'flex', gap: 14, flexWrap: 'wrap' },
  castMember: { width: 70, textAlign: 'center' },
  castPhoto: { width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', background: 'var(--surface-raised)' },
  castName: { fontSize: 11, marginTop: 4 },
  castRole: { fontSize: 10, color: 'var(--text-dim)' },
};

// Pure presentational component — expects the shape returned by
// GET /movies/<tmdb_id> (see backend/app/routes/movies.py). No data fetching here.
function MovieDetails({ movie }) {
  if (!movie) return null;

  return (
    <div style={styles.wrap}>
      {movie.poster_url ? (
        <img src={movie.poster_url} alt={movie.title} style={styles.poster} />
      ) : (
        <div style={{ ...styles.poster, height: 330 }} />
      )}

      <div style={styles.info}>
        <h1 style={styles.title}>{movie.title}</h1>
        <div style={styles.meta}>
          {movie.year} {movie.runtime ? `· ${movie.runtime} min` : ''} <MovieRating rating={movie.rating} />
        </div>

        {movie.genres?.length > 0 && (
          <div style={styles.genres}>
            {movie.genres.map((g) => (
              <span key={g} style={styles.genreTag}>{g}</span>
            ))}
          </div>
        )}

        <p style={styles.overview}>{movie.overview}</p>

        {movie.cast?.length > 0 && (
          <>
            <h3 style={{ fontSize: 14, marginBottom: 10 }}>Top cast</h3>
            <div style={styles.castRow}>
              {movie.cast.map((c) => (
                <div key={c.name} style={styles.castMember}>
                  {c.profile_url ? (
                    <img src={c.profile_url} alt={c.name} style={styles.castPhoto} />
                  ) : (
                    <div style={styles.castPhoto} />
                  )}
                  <div style={styles.castName}>{c.name}</div>
                  <div style={styles.castRole}>{c.character}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;

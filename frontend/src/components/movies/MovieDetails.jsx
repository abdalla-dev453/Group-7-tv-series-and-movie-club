import { Link } from 'react-router-dom';
import theme from '../../theme.js';
import MovieRating from './MovieRating.jsx';

const MovieDetails = ({ movie }) => {
  if (!movie) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: 'center',
          color: theme.color.textDim,
        }}
      >
        Movie not found.
      </div>
    );
  }

  const title =
    movie.title ||
    movie.name ||
    'Untitled movie';

  const posterUrl =
    movie.url ||
    movie.posterUrl ||
    movie.poster_url ||
    movie.poster;

  const description =
    movie.description ||
    movie.overview ||
    'No description available.';

  const rating =
    movie.rating ??
    movie.averageRating ??
    movie.average_rating ??
    0;

  const genre =
    movie.genre ||
    movie.genres ||
    'General';

  return (
    <div
      style={{
        background: theme.color.coalCard,
        border: `1px solid ${theme.color.coalBorder}`,
        borderRadius: theme.radius.lg,
        padding: 24,
        boxShadow: theme.shadow.card,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'minmax(180px, 280px) 1fr',
          gap: 28,
          alignItems: 'start',
        }}
      >
        {/* Poster */}
        <div
          style={{
            width: '100%',
            aspectRatio: '2 / 3',
            borderRadius: theme.radius.md,
            overflow: 'hidden',
            background: posterUrl
              ? `url(${posterUrl}) center/cover no-repeat`
              : `linear-gradient(
                  160deg,
                  ${theme.color.coalBorder},
                  ${theme.color.coalSoft}
                )`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
          }}
        >
          {!posterUrl && '🎬'}
        </div>

        {/* Details */}
        <div>
          <span
            style={{
              display: 'inline-block',
              color: '#1a1204',
              background: theme.color.amber,
              padding: '4px 10px',
              borderRadius: theme.radius.pill,
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            {Array.isArray(genre)
              ? genre.join(', ')
              : genre}
          </span>

          <h1
            style={{
              fontFamily: theme.font.heading,
              color: theme.color.text,
              fontSize: 32,
              margin: '0 0 10px',
            }}
          >
            {title}
          </h1>

          {movie.year && (
            <p
              style={{
                color: theme.color.textFaint,
                margin: '0 0 14px',
                fontSize: 13,
              }}
            >
              {movie.year}
            </p>
          )}

          <MovieRating rating={rating} />

          <p
            style={{
              color: theme.color.textDim,
              fontSize: 15,
              lineHeight: 1.7,
              margin: '20px 0',
            }}
          >
            {description}
          </p>

          {movie.director && (
            <p
              style={{
                color: theme.color.textDim,
                fontSize: 13,
              }}
            >
              <strong
                style={{
                  color: theme.color.text,
                }}
              >
                Director:
              </strong>{' '}
              {movie.director}
            </p>
          )}

          {movie.cast && (
            <p
              style={{
                color: theme.color.textDim,
                fontSize: 13,
              }}
            >
              <strong
                style={{
                  color: theme.color.text,
                }}
              >
                Cast:
              </strong>{' '}
              {Array.isArray(movie.cast)
                ? movie.cast.join(', ')
                : movie.cast}
            </p>
          )}

          <Link
            to="/movies"
            style={{
              display: 'inline-block',
              marginTop: 16,
              color: theme.color.amber,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            ← Back to movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
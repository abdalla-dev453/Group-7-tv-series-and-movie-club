import { Link } from 'react-router-dom';
import theme from '../../theme.js';
import MovieRating from './MovieRating.jsx';

const MovieCard = ({ movie }) => {
  if (!movie) {
    return null;
  }

  const movieId = movie.id;

  const title =
    movie.title ||
    movie.name ||
    'Untitled movie';

  const posterUrl =
    movie.url ||
    movie.posterUrl ||
    movie.poster_url ||
    movie.poster;

  const genre =
    movie.genre ||
    movie.genres ||
    'General';

  const rating =
    movie.rating ??
    movie.averageRating ??
    movie.average_rating ??
    0;

  const description =
    movie.description ||
    movie.overview ||
    'No description available.';

  return (
    <Link
      to={movieId ? `/movies/${movieId}` : '/movies'}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: theme.color.coalCard,
        border: `1px solid ${theme.color.coalBorder}`,
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        boxShadow: theme.shadow.card,
        transition:
          'transform 0.15s ease, border-color 0.15s ease',
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform =
          'translateY(-3px)';
        event.currentTarget.style.borderColor =
          theme.color.amber;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform =
          'translateY(0)';
        event.currentTarget.style.borderColor =
          theme.color.coalBorder;
      }}
    >
      {/* Poster */}
      <div
        style={{
          width: '100%',
          height: 280,
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
          fontSize: 42,
        }}
      >
        {!posterUrl && '🎬'}
      </div>

      {/* Movie information */}
      <div
        style={{
          padding: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
            marginBottom: 7,
          }}
        >
          <span
            style={{
              color: theme.color.amberSoft,
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {Array.isArray(genre)
              ? genre.join(', ')
              : genre}
          </span>

          {movie.year && (
            <span
              style={{
                color: theme.color.textFaint,
                fontSize: 11,
              }}
            >
              {movie.year}
            </span>
          )}
        </div>

        <h3
          style={{
            color: theme.color.text,
            fontFamily: theme.font.heading,
            fontSize: 18,
            margin: '0 0 8px',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            color: theme.color.textDim,
            fontSize: 13,
            lineHeight: 1.5,
            margin: '0 0 12px',
          }}
        >
          {description.slice(0, 100)}
          {description.length > 100 ? '…' : ''}
        </p>

        <MovieRating rating={rating} />
      </div>
    </Link>
  );
};

export default MovieCard;
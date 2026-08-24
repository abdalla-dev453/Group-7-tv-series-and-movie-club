import MovieCard from './MovieCard.jsx';
import theme from '../../theme.js';

const MovieGrid = ({
  movies = [],
  loading = false,
}) => {
  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: 'center',
          color: theme.color.textDim,
        }}
      >
        Loading movies...
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div
        style={{
          background: theme.color.coalCard,
          border: `1px solid ${theme.color.coalBorder}`,
          borderRadius: theme.radius.md,
          padding: 40,
          textAlign: 'center',
          color: theme.color.textDim,
        }}
      >
        <div
          style={{
            fontSize: 32,
            marginBottom: 10,
          }}
        >
          🎬
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 14,
          }}
        >
          No movies found.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'repeat(auto-fill, minmax(210px, 1fr))',
        gap: 20,
      }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
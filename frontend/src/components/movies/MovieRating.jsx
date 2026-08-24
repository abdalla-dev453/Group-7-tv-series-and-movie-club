import theme from '../../theme.js';

const MovieRating = ({
  rating = 0,
  onChange,
  size = 16,
}) => {
  const currentRating = Number(rating) || 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      }}
      aria-label={`Rating: ${currentRating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(currentRating);

        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            disabled={!onChange}
            aria-label={`Rate ${star} out of 5`}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              margin: 0,
              cursor: onChange ? 'pointer' : 'default',
              color: filled
                ? theme.color.amber
                : theme.color.coalBorder,
              fontSize: size,
              lineHeight: 1,
            }}
          >
            ★
          </button>
        );
      })}

      <span
        style={{
          marginLeft: 5,
          color: theme.color.textFaint,
          fontSize: 12,
        }}
      >
        {currentRating.toFixed(1)}
      </span>
    </div>
  );
};

export default MovieRating;
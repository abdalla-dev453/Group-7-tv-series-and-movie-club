import { Link } from 'react-router-dom';
import theme from '../theme.js';

const Star = ({ filled }) => (
  <span
    aria-hidden="true"
    style={{
      color: filled
        ? theme.color.amber
        : theme.color.coalBorder,
      fontSize: 14,
    }}
  >
    ★
  </span>
);

const PostCard = ({ post }) => {
  const {
    id,
    title,
    movieTitle,
    caption,
    body,
    rating = 0,
    author,
    club,
    createdAt,
    posterUrl,
  } = post || {};

  // Safely convert rating to a number between 0 and 5
  const safeRating = Math.min(
    5,
    Math.max(
      0,
      Number.isFinite(Number(rating))
        ? Number(rating)
        : 0
    )
  );

  const roundedRating = Math.round(safeRating);

  const displayTitle =
    title ||
    caption ||
    movieTitle ||
    'Untitled post';

  const displayBody =
    body ||
    caption ||
    '';

  const authorName =
    author?.username ||
    author?.name ||
    'Anonymous';

  return (
    <article
      style={{
        background: theme.color.coalCard,
        border: `1px solid ${theme.color.coalBorder}`,
        borderRadius: theme.radius.md,
        padding: 18,
        display: 'flex',
        gap: 16,
        boxShadow: theme.shadow.card,
      }}
    >
      {/* Movie Poster */}
      <div
        style={{
          width: 64,
          height: 88,
          flexShrink: 0,
          borderRadius: theme.radius.sm,

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
          fontSize: 22,
          overflow: 'hidden',
        }}
        aria-label={
          posterUrl
            ? `${movieTitle || 'Movie'} poster`
            : 'No poster available'
        }
      >
        {!posterUrl && '🎞️'}
      </div>

      {/* Post Content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Movie + Club */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <span
            style={{
              color: theme.color.amberSoft,
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {movieTitle || 'Watched'}
          </span>

          {club && (
            <span
              style={{
                fontSize: 11,
                color: theme.color.textFaint,
                whiteSpace: 'nowrap',
              }}
            >
              in {club.name || club}
            </span>
          )}
        </div>

        {/* Post Title */}
        {id ? (
          <Link
            to={`/posts/${id}`}
            style={{
              display: 'block',
              color: theme.color.text,
              fontFamily: theme.font.heading,
              fontSize: 18,
              fontWeight: 700,
              textDecoration: 'none',
              margin: '4px 0 6px',
            }}
          >
            {displayTitle}
          </Link>
        ) : (
          <h3
            style={{
              color: theme.color.text,
              fontFamily: theme.font.heading,
              fontSize: 18,
              fontWeight: 700,
              margin: '4px 0 6px',
            }}
          >
            {displayTitle}
          </h3>
        )}

        {/* Description */}
        <p
          style={{
            color: theme.color.textDim,
            fontSize: 14,
            margin: '0 0 10px',
            lineHeight: 1.5,
          }}
        >
          {displayBody.slice(0, 160)}
          {displayBody.length > 160 ? '…' : ''}
        </p>

        {/* Bottom Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {/* Author */}
          <span
            style={{
              fontSize: 12,
              color: theme.color.textFaint,
            }}
          >
            @{authorName}

            {createdAt && (
              <>
                {' · '}
                {new Date(createdAt).toLocaleDateString()}
              </>
            )}
          </span>

          {/* Rating */}
          <div
            style={{
              display: 'flex',
              gap: 2,
              flexShrink: 0,
            }}
            aria-label={`Rating: ${safeRating} out of 5`}
          >
            {[1, 2, 3, 4, 5].map((number) => (
              <Star
                key={number}
                filled={number <= roundedRating}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
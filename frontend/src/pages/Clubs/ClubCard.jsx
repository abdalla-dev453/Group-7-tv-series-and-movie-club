import { Link } from 'react-router-dom';
import theme from '../../theme.js';

const ClubCard = ({ club }) => {
  const {
    id,
    name,
    genre,
    memberCount,
    description,
  } = club || {};

  return (
    <Link
      to={id ? `/clubs/${id}` : '/clubs'}
      style={{
        textDecoration: 'none',
        display: 'block',
        background: theme.color.coalCard,
        border: `1px solid ${theme.color.coalBorder}`,
        borderRadius: theme.radius.md,
        padding: 18,
        boxShadow: theme.shadow.card,
        transition: 'border-color 0.15s ease',
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor =
          theme.color.amber;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor =
          theme.color.coalBorder;
      }}
    >
      {/* Genre and member count */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
          gap: 10,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 0.6,
            color: '#1a1204',
            background: theme.color.amber,
            padding: '3px 9px',
            borderRadius: theme.radius.pill,
          }}
        >
          {genre || 'General'}
        </span>

        <span
          style={{
            fontSize: 12,
            color: theme.color.textFaint,
            whiteSpace: 'nowrap',
          }}
        >
          {memberCount ?? 0} members
        </span>
      </div>

      {/* Club name */}
      <h3
        style={{
          fontFamily: theme.font.heading,
          color: theme.color.text,
          margin: '0 0 6px',
          fontSize: 18,
        }}
      >
        {name || 'Untitled club'}
      </h3>

      {/* Description */}
      <p
        style={{
          color: theme.color.textDim,
          fontSize: 13,
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {(description || 'No description yet.').slice(0, 110)}
        {(description || '').length > 110 ? '…' : ''}
      </p>
    </Link>
  );
};

export default ClubCard;
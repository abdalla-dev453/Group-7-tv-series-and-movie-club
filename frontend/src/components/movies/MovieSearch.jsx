import { useState } from 'react';
import theme from '../../theme.js';

const MovieSearch = ({
  onSearch,
  placeholder = 'Search movies...',
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch?.(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: 10,
        width: '100%',
        maxWidth: 600,
      }}
    >
      <div
        style={{
          position: 'relative',
          flex: 1,
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder={placeholder}
          aria-label="Search movies"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: theme.color.coalCard,
            border: `1px solid ${theme.color.coalBorder}`,
            borderRadius: theme.radius.pill,
            padding: '10px 42px 10px 16px',
            color: theme.color.text,
            fontSize: 14,
            outline: 'none',
          }}
          onFocus={(event) => {
            event.currentTarget.style.borderColor =
              theme.color.amber;
          }}
          onBlur={(event) => {
            event.currentTarget.style.borderColor =
              theme.color.coalBorder;
          }}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: theme.color.textFaint,
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            ×
          </button>
        )}
      </div>

      <button
        type="submit"
        style={{
          background: theme.color.amber,
          color: '#1a1204',
          border: 'none',
          borderRadius: theme.radius.pill,
          padding: '10px 18px',
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
};

export default MovieSearch;
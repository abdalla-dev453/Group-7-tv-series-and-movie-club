const MovieDetails = ({ movie = {} }) => {
  const imageUrl = movie.poster_url || movie.backdrop_url || movie.image_url;
  const imageAlt = `${movie.title || 'Movie'} poster`;

  return (
    <section
      className='movie-details'
      style={{
        display: 'grid',
        gap: 20,
        background: '#171510',
        border: '1px solid #3a3528',
        borderRadius: 16,
        padding: 24,
        color: '#f4efe5',
        boxShadow: '0 12px 34px rgba(0,0,0,0.24)',
      }}
    >
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={imageAlt}
            style={{
              width: 220,
              height: 330,
              objectFit: 'cover',
              borderRadius: 12,
              border: '1px solid #4a4436',
              background: '#201d16',
              flexShrink: 0,
            }}
          />
        )}

        <div style={{ flex: 1, minWidth: 220 }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 36, fontFamily: 'Georgia, serif' }}>
            {movie.title || 'Untitled movie'}
          </h2>

          {Array.isArray(movie.genres) && movie.genres.length > 0 && (
            <p style={{ margin: '0 0 12px', color: '#ffbf1a', fontWeight: 700 }}>
              {movie.genres.join(', ')}
            </p>
          )}

          {movie.overview ? (
            <p style={{ margin: 0, color: '#d9d2c5', lineHeight: 1.7 }}>{movie.overview}</p>
          ) : (
            <p style={{ margin: 0, color: '#d9d2c5' }}>No plot summary is available.</p>
          )}
        </div>
      </div>

      {Array.isArray(movie.cast) && movie.cast.length > 0 && (
        <p style={{ margin: 0, color: '#d9d2c5' }}>
          <strong style={{ color: '#f4efe5' }}>Cast:</strong> {' '}
          {movie.cast.map((member) => member?.name).filter(Boolean).join(', ')}
        </p>
      )}
    </section>
  );
};

export default MovieDetails;

const MovieDetails = ({ movie = {} }) => {
  const imageUrl = movie.poster_url || movie.backdrop_url || movie.image_url;
  const imageAlt = `${movie.title || 'Movie'} poster`;

  return (
    <section
      className='movie-details'
      style={{
        display: 'grid',
        gap: 20,
        background: 'linear-gradient(135deg, rgba(18, 17, 20, 0.98), rgba(26, 25, 28, 0.96))',
        border: '1px solid rgba(212, 175, 55, 0.18)',
        borderRadius: 22,
        padding: 28,
        color: '#f4efe5',
        boxShadow: '0 18px 40px rgba(0,0,0,0.24)',
      }}
    >
      <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={imageAlt}
            style={{
              width: 220,
              height: 330,
              objectFit: 'cover',
              borderRadius: 16,
              border: '1px solid rgba(212, 175, 55, 0.22)',
              background: '#201d16',
              flexShrink: 0,
              boxShadow: '0 16px 30px rgba(0,0,0,0.28)',
            }}
          />
        )}

        <div style={{ flex: 1, minWidth: 220 }}>
          <p style={{ margin: '0 0 8px', color: '#d4af37', fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Featured film
          </p>
          <h2 style={{ margin: '0 0 12px', fontSize: 40, fontFamily: 'Georgia, serif', lineHeight: 1.05 }}>
            {movie.title || 'Untitled movie'}
          </h2>

          {Array.isArray(movie.genres) && movie.genres.length > 0 && (
            <p style={{ margin: '0 0 12px', color: '#ffbf1a', fontWeight: 700 }}>
              {movie.genres.join(', ')}
            </p>
          )}

          {movie.overview ? (
            <p style={{ margin: 0, color: '#d9d2c5', lineHeight: 1.8, fontSize: 15 }}>{movie.overview}</p>
          ) : (
            <p style={{ margin: 0, color: '#d9d2c5' }}>No plot summary is available.</p>
          )}
        </div>
      </div>

      {Array.isArray(movie.cast) && movie.cast.length > 0 && (
        <p style={{ margin: 0, color: '#d9d2c5', lineHeight: 1.7 }}>
          <strong style={{ color: '#f4efe5' }}>Cast:</strong> {' '}
          {movie.cast.map((member) => member?.name).filter(Boolean).join(', ')}
        </p>
      )}
    </section>
  );
};

export default MovieDetails;

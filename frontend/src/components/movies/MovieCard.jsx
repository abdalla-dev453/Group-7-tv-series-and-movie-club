const MovieCard = ({ movie = {} }) => (
  <article className='movie-card'>
    {movie.poster_url ? <img className='movie-card__poster' src={movie.poster_url} alt={`${movie.title || 'Movie'} poster`} loading='lazy' /> : <div className='movie-card__poster' aria-label='No poster available' />}
    <h3>{movie.title || 'Untitled movie'}</h3>
    {movie.year && <small>{movie.year}</small>}
  </article>
);

export default MovieCard;

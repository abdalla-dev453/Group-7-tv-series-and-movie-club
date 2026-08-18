const MovieCard = ({ title, year, genre }) => (
  <article className='movie-card'>
    <div className='movie-card__poster' />
    <h3>{title}</h3>
    <p>{genre}</p>
    <small>{year}</small>
  </article>
);

export default MovieCard;

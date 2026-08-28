import MovieRating from './MovieRating';

const MovieDetails = ({ movie = {} }) => (
  <section className='movie-details'>
    <h2>{movie.title || 'Untitled movie'}</h2>
    <MovieRating rating={movie.rating} />
    {movie.overview ? <p>{movie.overview}</p> : <p>No plot summary is available.</p>}
    {Array.isArray(movie.genres) && movie.genres.length > 0 && <p>{movie.genres.join(', ')}</p>}
    {Array.isArray(movie.cast) && movie.cast.length > 0 && <p>Cast: {movie.cast.map((member) => member?.name).filter(Boolean).join(', ')}</p>}
  </section>
);

export default MovieDetails;

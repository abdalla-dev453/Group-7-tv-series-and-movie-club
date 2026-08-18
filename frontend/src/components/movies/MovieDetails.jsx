const MovieDetails = ({ title = 'Movie Title' }) => (
  <section className='movie-details'>
    <h2>{title}</h2>
    <p>Plot summary and cast details go here.</p>
  </section>
);

export default MovieDetails;

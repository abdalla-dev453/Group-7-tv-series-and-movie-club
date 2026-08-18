const MovieGrid = ({ movies = [] }) => (
  <section className='movie-grid'>
    {movies.length ? movies.map((movie) => <div key={movie.id}>{movie.title}</div>) : <p>No movies yet.</p>}
  </section>
);

export default MovieGrid;

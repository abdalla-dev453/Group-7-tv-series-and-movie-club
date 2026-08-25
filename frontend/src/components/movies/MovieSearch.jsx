const MovieSearch = ({ value = '', onChange, disabled = false }) => (
  <div className='movie-search'>
    <input type='search' value={value} onChange={onChange} disabled={disabled} placeholder='Search movies or shows' aria-label='Search movies or shows' />
  </div>
);

export default MovieSearch;

import { useEffect, useState } from 'react';
import MovieSearch from '../../components/movies/MovieSearch';
import { deleteWatched, getWatched, logWatched } from '../../services/watchedService';

const getItems = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  return data?.items || data?.results || data?.data || [];
};

const WatchedList = () => {
  const [watched, setWatched] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getWatched().then((response) => setWatched(getItems(response))).catch(() => setError('Could not load your watched list.'));
  }, []);

  const addWatched = async () => {
    if (!selected) return;
    try {
      const { data } = await logWatched({ movie_title: selected.title });
      setWatched((current) => [data, ...current]);
      setSelected(null);
    } catch {
      setError('Could not add that title.');
    }
  };

  const removeWatched = async (item) => {
    try {
      await deleteWatched(item.id);
      setWatched((current) => current.filter((entry) => entry.id !== item.id));
    } catch {
      setError('Could not remove that title.');
    }
  };

  return (
    <section className="page-panel watched-page">
      <h1>Watched list</h1>
      <div className="watched-add"><MovieSearch onSelect={setSelected} placeholder="Find a title to add" /><button className="button" type="button" disabled={!selected} onClick={addWatched}>Add to watched</button></div>
      {selected && <p className="muted">Ready to add: {selected.title}</p>}
      {error && <p className="error-message">{error}</p>}
      {watched.length === 0 ? <p className="muted">You have not logged any titles yet.</p> : <div className="watched-grid">{watched.map((item) => <article className="watched-item" key={item.id}><strong>{item.movie_title}</strong><span>{item.watched_date || ''}</span><button type="button" onClick={() => removeWatched(item)} aria-label={`Remove ${item.movie_title}`}>Remove</button></article>)}</div>}
    </section>
  );
};

export default WatchedList;

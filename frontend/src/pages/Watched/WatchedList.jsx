import { useEffect, useState } from 'react';
import { getWatched } from '../../services/watchedService.js';
import Loader from '../../components/common/Loader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

const WatchedList = () => {
  const [state, setState] = useState({ status: 'loading', entries: [] });
  useEffect(() => {
    const controller = new AbortController();
    getWatched(controller.signal).then(({ data }) => setState({ status: 'success', entries: Array.isArray(data) ? data : [] })).catch((error) => {
      if (error.code !== 'ERR_CANCELED') setState({ status: 'error', entries: [] });
    });
    return () => controller.abort();
  }, []);
  if (state.status === 'loading') return <Loader />;
  if (state.status === 'error') return <ErrorMessage message="Could not load your watched list. Please try again." />;
  return <section className="page-panel"><header className="page-heading"><div><p className="eyebrow">Your private archive</p><h1>The watches that stayed with you.</h1></div><span className="count">{state.entries.length} logged</span></header>{state.entries.length === 0 ? <EmptyState title="Nothing watched yet" message="Log a movie after your next watch." /> : <ul className="watched-list">{state.entries.map((entry) => <li key={entry.id}><span>{entry.movie_title || 'Untitled watch'}</span>{entry.watched_date && <time>{entry.watched_date}</time>}</li>)}</ul>}</section>;
};

export default WatchedList;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClubs } from '../../services/clubService.js';
import Loader from '../../components/common/Loader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

const ClubList = () => {
  const [state, setState] = useState({ status: 'loading', clubs: [] });

  useEffect(() => {
    const controller = new AbortController();
    getClubs(1, 20, controller.signal)
      .then(({ data }) => setState({ status: 'success', clubs: Array.isArray(data?.items) ? data.items : [] }))
      .catch((error) => {
        if (error.code !== 'ERR_CANCELED') setState({ status: 'error', clubs: [] });
      });
    return () => controller.abort();
  }, []);

  if (state.status === 'loading') return <Loader />;
  if (state.status === 'error') return <ErrorMessage message="Could not load clubs. Please try again." />;

  return <section className="page-panel"><header className="page-heading"><div><p className="eyebrow">Find your people</p><h1>Every genre needs a room.</h1></div><Link className="nav-cta" to="/clubs/new">Start a club</Link></header>{state.clubs.length === 0 ? <EmptyState title="No clubs yet" message="Create the first club for your favourite genre." /> : <div className="club-grid">{state.clubs.map((club) => <Link className="club-tile" key={club.id} to={`/clubs/${club.id}`}><span className="club-genre">{club.genre || 'Open genre'}</span><h2>{club.name}</h2><p>{club.description || 'A new circle is waiting for its first conversation.'}</p></Link>)}</div>}</section>;
};

export default ClubList;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClub } from '../../services/clubService.js';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

const ClubDetail = () => {
  const { id } = useParams();
  const [state, setState] = useState({ status: 'loading', club: null });

  useEffect(() => {
    const controller = new AbortController();
    getClub(id, controller.signal)
      .then(({ data }) => setState({ status: 'success', club: data }))
      .catch((error) => {
        if (error.code !== 'ERR_CANCELED') setState({ status: error.response?.status === 404 ? 'not-found' : 'error', club: null });
      });
    return () => controller.abort();
  }, [id]);

  if (state.status === 'loading') return <Loader />;
  if (state.status === 'not-found') return <ErrorMessage message="This club no longer exists." />;
  if (state.status === 'error') return <ErrorMessage message="Could not load this club. Please try again." />;

  return <section className="page-panel"><p className="eyebrow">{state.club?.genre || 'Film club'}</p><h1>{state.club?.name || 'Club'}</h1><p>{state.club?.description || 'A good room makes every watch better.'}</p><div className="feed-aside"><span className="count">The next conversation starts here</span></div></section>;
};

export default ClubDetail;

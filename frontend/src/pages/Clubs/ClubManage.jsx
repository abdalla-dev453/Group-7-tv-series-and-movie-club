import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getClubMembers } from '../../services/clubService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

const ClubManage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [state, setState] = useState({ status: 'loading', isAdmin: false });

  useEffect(() => {
    const controller = new AbortController();
    getClubMembers(id, controller.signal).then(({ data }) => {
      const membership = Array.isArray(data) ? data.find((member) => member.user_id === user?.id) : null;
      setState({ status: 'success', isAdmin: membership?.role === 'admin' });
    }).catch((error) => {
      if (error.code !== 'ERR_CANCELED') setState({ status: 'error', isAdmin: false });
    });
    return () => controller.abort();
  }, [id, user?.id]);

  if (state.status === 'loading') return <Loader />;
  if (state.status === 'error') return <ErrorMessage message="Could not verify club permissions." />;
  if (!state.isAdmin) return <Navigate to={`/clubs/${id}`} replace />;
  return <section className="page-panel"><h1>Manage club</h1><p>You are authorized to manage this club. Server-side permissions remain enforced for every update.</p></section>;
};

export default ClubManage;

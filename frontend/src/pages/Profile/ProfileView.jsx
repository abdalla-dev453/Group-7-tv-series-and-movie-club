import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../services/userService.js';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

const ProfileView = () => {
  const { id } = useParams();
  const [state, setState] = useState({ status: 'loading', user: null });

  useEffect(() => {
    const controller = new AbortController();
    getProfile(id, { signal: controller.signal }).then(({ data }) => setState({ status: 'success', user: data })).catch((error) => {
      if (error.code !== 'ERR_CANCELED') setState({ status: error.response?.status === 404 ? 'not-found' : 'error', user: null });
    });
    return () => controller.abort();
  }, [id]);

  if (state.status === 'loading') return <Loader />;
  if (state.status === 'not-found') return <ErrorMessage message="This user no longer exists." />;
  if (state.status === 'error') return <ErrorMessage message="Could not load this profile. Please try again." />;
  const name = state.user?.username || 'Member';
  return <section className="page-panel"><p className="eyebrow">Member card</p><div className="profile-hero">{state.user?.avatar_url ? <img className="profile-avatar" src={state.user.avatar_url} alt="" loading="lazy" /> : <div className="profile-avatar profile-avatar-fallback">{name.slice(0, 1).toUpperCase()}</div>}<div><h1>{name}</h1><p>{state.user?.bio || 'Still choosing what to watch next.'}</p></div><span className="count">REEL CLUB MEMBER</span></div></section>;
};

export default ProfileView;

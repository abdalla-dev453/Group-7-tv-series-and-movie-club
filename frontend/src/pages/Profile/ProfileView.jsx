import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProfile } from '../../services/userService';

const ProfileView = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getProfile(id)
      .then(({ data }) => active && setProfile(data?.user || data))
      .catch(() => active && setError('Could not load this profile.'));
    return () => { active = false; };
  }, [id]);

  if (error) return <section className="page-panel"><p className="error-message">{error}</p></section>;
  if (!profile) return <section className="page-panel"><p className="muted">Loading profile...</p></section>;

  const name = profile.username || profile.name || profile.email || 'Movie fan';
  return (
    <section className="page-panel profile-page">
      <div className="profile-avatar">{name.charAt(0).toUpperCase()}</div>
      <h1>{name}</h1>
      <p className="muted">{profile.bio || 'Cinema enthusiast'}</p>
      <div className="profile-stats">
        <span><strong>{profile.post_count ?? profile.posts_count ?? 0}</strong> posts</span>
        <span><strong>{profile.follower_count ?? profile.followers_count ?? 0}</strong> followers</span>
        <span><strong>{profile.following_count ?? profile.following?.length ?? 0}</strong> following</span>
      </div>
      <Link className="button" to={`/profile/${id}/edit`}>Edit profile</Link>
    </section>
  );
};

export default ProfileView;

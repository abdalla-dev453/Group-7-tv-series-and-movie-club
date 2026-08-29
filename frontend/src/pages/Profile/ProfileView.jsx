import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProfile } from '../../services/userService';
import { useAuth } from '../../context/AuthContext.jsx';
import FollowButton from '../../components/users/FollowButton.jsx';
import UserAvatar from '../../components/users/UserAvatar.jsx';

const ProfileView = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getProfile(id)
      .then(({ data }) => {
        if (!active) return;
        setProfile(data?.user || data);
      })
      .catch(() => {
        if (!active) return;
        setError('Could not load this profile.');
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (error) {
    return (
      <section className="page-panel">
        <p className="error-message">{error}</p>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="page-panel">
        <p className="muted">Loading profile...</p>
      </section>
    );
  }

  const name =
    profile.username ||
    profile.name ||
    profile.email ||
    'Movie fan';

  const isOwnProfile =
    Number(user?.id) === Number(profile.id || id);

  return (
    <section className="page-panel profile-page">

      {/* Avatar */}
      <UserAvatar name={name} />

      {/* Profile information */}
      <h1>{name}</h1>

      <p className="muted">
        {profile.bio || 'Cinema enthusiast'}
      </p>

      {/* Stats */}
      <div className="profile-stats">
        <span>
          <strong>
            {profile.post_count ??
              profile.posts_count ??
              0}
          </strong>{' '}
          posts
        </span>

        <span>
          <strong>
            {profile.follower_count ??
              profile.followers_count ??
              0}
          </strong>{' '}
          followers
        </span>

        <span>
          <strong>
            {profile.following_count ??
              profile.following?.length ??
              0}
          </strong>{' '}
          following
        </span>
      </div>

      {/* ACTIONS */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '20px',
          alignItems: 'center',
        }}
      >

        {/* Don't show Follow on your own profile */}
        {!isOwnProfile && (
          <FollowButton
            userId={profile.id || id}
          />
        )}

        {/* Only show Edit on your own profile */}
        {isOwnProfile && (
          <Link
            className="button"
            to={`/profile/${id}/edit`}
          >
            Edit profile
          </Link>
        )}

      </div>
    </section>
  );
};

export default ProfileView;
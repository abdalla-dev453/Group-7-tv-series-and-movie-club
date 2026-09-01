import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProfile } from '../../services/userService';
import { useAuth } from '../../context/AuthContext.jsx';
import FollowButton from '../../components/users/FollowButton.jsx';
import UserAvatar from '../../components/users/UserAvatar.jsx';
import { getWatched } from '../../services/watchedService';
import { getMutual } from '../../services/followService';
import theme from '../../theme.js';

const getProfileImage = (profile = {}) =>
  profile.profile_image_url ||
  profile.profileImageUrl ||
  profile.avatar_url ||
  profile.avatarUrl ||
  profile.image_url ||
  profile.imageUrl ||
  '';

const ProfileView = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [watched, setWatched] = useState([]);
  const [mutual, setMutual] = useState([]);

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

  useEffect(() => {
    if (!profile) return;

    let active = true;
    getMutual(profile.id || id)
      .then(({ data }) => {
        if (!active) return;
        setMutual(Array.isArray(data) ? data : data?.items || []);
      })
      .catch(() => {
        if (!active) return;
        setMutual([]);
      });

    return () => {
      active = false;
    };
  }, [profile, id]);

  useEffect(() => {
    if (!profile) return;
    const isOwn = Number(user?.id) === Number(profile.id || id);
    if (!isOwn) return;

    let active = true;
    getWatched()
      .then(({ data }) => {
        if (!active) return;
        setWatched((data?.items || data || []).slice(0, 6));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [profile, user, id]);

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
      <UserAvatar name={name} imageUrl={getProfileImage(profile)} size={256} className="profile-avatar" />

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

      {mutual.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <p style={{ color: theme.color.textFaint, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px' }}>
            Mutual follows
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {mutual.slice(0, 6).map((person) => {
              const personName = person.username || person.name || 'Friend';
              const personId = person.id || person.user_id; 

              return (
                <Link
                  key={personId}
                  to={personId ? `/profile/${personId}` : '/discover'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 10px',
                    borderRadius: 999,
                    border: `1px solid ${theme.color.coalBorder}`,
                    textDecoration: 'none',
                    color: theme.color.text,
                    background: theme.color.coalCard,
                  }}
                >
                  <UserAvatar name={personName} imageUrl={getProfileImage(person)} size={26} />
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{personName}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

{isOwnProfile && watched.length > 0 && (
  <>
    <p style={{ color: theme.color.textFaint, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '24px 0 12px' }}>
      Recently watched
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {watched.map((movie) => (
        <div key={movie.id} style={{ borderRadius: theme.radius.sm, overflow: 'hidden', background: theme.color.coalCard }}>
          <div
            style={{
              aspectRatio: '2 / 3',
              background: movie.poster_url
                ? `url(${movie.poster_url}) center/cover no-repeat`
                : `linear-gradient(160deg, ${theme.color.coalBorder}, ${theme.color.coalSoft})`,
              display: 'flex',
              alignItems: 'flex-end',
              padding: 8,
            }}
          >
            <span style={{ color: theme.color.text, fontSize: 12, fontWeight: 600 }}>
              {movie.movie_title || movie.title}
            </span>
          </div>
          {movie.personal_rating != null && (
            <div style={{ padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: theme.color.amber, fontSize: 13 }}>★</span>
              <span style={{ color: theme.color.amber, fontSize: 12 }}>{movie.personal_rating}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  </>
)}
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
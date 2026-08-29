import { useEffect, useState } from 'react';
import {
  followUser,
  unfollowUser,
  getFollowing,
} from '../../services/followService.js';
import { useAuth } from '../../context/AuthContext.jsx';

const FollowButton = ({
  userId,
  onFollowChange,
}) => {
  const { user } = useAuth();

  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  // Check whether the current user already follows this user
  useEffect(() => {
    let active = true;

    const checkFollowing = async () => {
      if (!user?.id || !userId) {
        if (active) setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const { data } = await getFollowing(user.id);

        if (!active) return;

        const followingUsers = Array.isArray(data) ? data : [];

        const alreadyFollowing = followingUsers.some(
          (followedUser) =>
            Number(followedUser.id) === Number(userId)
        );

        setFollowing(alreadyFollowing);
      } catch (err) {
        if (!active) return;

        setError(
          err.response?.data?.error ||
            'Could not check follow status.'
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    checkFollowing();

    return () => {
      active = false;
    };
  }, [user?.id, userId]);

  const handleFollow = async () => {
    if (!userId || actionLoading) return;

    setActionLoading(true);
    setError('');

    try {
      if (following) {
        await unfollowUser(userId);

        setFollowing(false);
        onFollowChange?.(false);
      } else {
        await followUser(userId);

        setFollowing(true);
        onFollowChange?.(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Could not update follow status.'
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleFollow}
        disabled={loading || actionLoading}
        style={{
          padding: '9px 18px',
          borderRadius: '7px',
          border: following
            ? '1px solid #4a4436'
            : 'none',
          background: following
            ? 'transparent'
            : '#ffbf1a',
          color: following
            ? '#f4efe5'
            : '#181207',
          fontWeight: 700,
          fontSize: '13px',
          cursor:
            loading || actionLoading
              ? 'not-allowed'
              : 'pointer',
          opacity:
            loading || actionLoading ? 0.6 : 1,
        }}
      >
        {loading
          ? 'Checking...'
          : actionLoading
            ? 'Updating...'
            : following
              ? 'Following ✓'
              : 'Follow'}
      </button>

      {error && (
        <p
          style={{
            marginTop: '6px',
            color: '#ffb4b4',
            fontSize: '12px',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FollowButton;
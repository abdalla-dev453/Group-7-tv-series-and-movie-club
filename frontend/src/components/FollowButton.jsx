import { useEffect, useState } from 'react';
import * as followService from '../services/followService.js';
import { buttonStyles } from '../theme.js';

const FollowButton = ({
  userId,
  initialFollowing = false,
}) => {
  const [following, setFollowing] = useState(initialFollowing);
  const [busy, setBusy] = useState(false);

  // Keep state synchronized with the parent component
  useEffect(() => {
    setFollowing(initialFollowing);
  }, [initialFollowing]);

  const toggleFollow = async () => {
    if (busy || !userId) return;

    const nextFollowing = !following;

    // Optimistically update the UI
    setFollowing(nextFollowing);
    setBusy(true);

    try {
      if (nextFollowing) {
        await followService.followUser(userId);
      } else {
        await followService.unfollowUser(userId);
      }
    } catch (error) {
      // If the request fails, restore the previous state
      setFollowing(!nextFollowing);

      console.error('Failed to update follow status:', error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFollow}
      disabled={busy || !userId}
      aria-pressed={following}
      style={{
        ...buttonStyles.base,

        ...(following
          ? buttonStyles.ghost
          : buttonStyles.primary),

        padding: '6px 14px',
        fontSize: 13,
        minWidth: 90,
        opacity: busy ? 0.6 : 1,
        cursor:
          busy || !userId
            ? 'not-allowed'
            : 'pointer',
      }}
    >
      {busy
        ? 'Please wait...'
        : following
          ? 'Unfollow'
          : 'Follow'}
    </button>
  );
};

export default FollowButton;
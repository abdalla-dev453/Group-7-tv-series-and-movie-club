import { useEffect, useState } from 'react';
import * as followService from '../services/followService.js';
import { buttonStyles } from '../theme.js';

const FollowButton = ({
  userId,
  initialFollowing = false,
}) => {
  const [following, setFollowing] = useState(initialFollowing);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setFollowing(initialFollowing);
  }, [initialFollowing]);

  const toggleFollow = async () => {
    if (busy || !userId) return;

    const nextFollowing = !following;

    // Update the button immediately
    setFollowing(nextFollowing);
    setBusy(true);

    try {
      if (nextFollowing) {
        await followService.followUser(userId);
      } else {
        await followService.unfollowUser(userId);
      }
    } catch (error) {
      // Restore previous state if the request fails
      setFollowing(!nextFollowing);

      console.error(
        'Failed to update follow status:',
        error
      );
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
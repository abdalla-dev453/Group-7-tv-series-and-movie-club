import { useState } from 'react';
import { joinClub, leaveClub } from '../../services/clubService';

const JoinClubButton = ({
  clubId,
  isMember = false,
  isAdmin = false,
  onMembershipChange,
}) => {
  const [joined, setJoined] = useState(isMember);
  const [loading, setLoading] = useState(false);

  const handleMembership = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!clubId || loading || isAdmin) return;

    setLoading(true);

    try {
      if (joined) {
        await leaveClub(clubId);

        setJoined(false);
        onMembershipChange?.(false);
      } else {
        await joinClub(clubId);

        setJoined(true);
        onMembershipChange?.(true);
      }
    } catch (error) {
      console.error('Unable to update club membership:', error);
    } finally {
      setLoading(false);
    }
  };

  const buttonStyle = {
    border: 'none',
    borderRadius: '7px',
    padding: '9px 15px',
    fontSize: '12px',
    fontWeight: 700,
    cursor: loading || isAdmin ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    opacity: loading ? 0.7 : 1,

    ...(isAdmin
      ? {
          background: '#2a2925',
          color: '#b8b5ac',
          border: '1px solid #3a3832',
        }
      : joined
        ? {
            background: 'transparent',
            color: '#d6a84f',
            border: '1px solid #d6a84f',
          }
        : {
            background: '#d6a84f',
            color: '#17140e',
          }),
  };

  if (isAdmin) {
    return (
      <button
        type="button"
        disabled
        style={buttonStyle}
      >
        Club Admin
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleMembership}
      disabled={loading}
      style={buttonStyle}
    >
      {loading
        ? 'Updating...'
        : joined
          ? 'Joined ✓'
          : 'Join Club'}
    </button>
  );
};

export default JoinClubButton;
import { useEffect, useState } from 'react';
import Button from "../../components/Button";
import { joinClub, leaveClub } from '../../services/clubService';
import './JoinClubButton.css';

const JoinClubButton = ({
  clubId,
  isMember = false,
  isAdmin = false,
  onMembershipChange,
}) => {
  const [joined, setJoined] = useState(isMember);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setJoined(isMember);
  }, [isMember]);

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

  if (isAdmin) {
    return (
      <Button variant="secondary" disabled>
        Club Admin
      </Button>
    );
  }

  return (
    <Button
      variant={joined ? 'secondary' : 'primary'}
      onClick={handleMembership}
      disabled={loading}
    >
      {loading
        ? 'Updating...'
        : joined
          ? 'Joined ✓'
          : 'Join Club'}
    </Button>
  );
};

export default JoinClubButton;
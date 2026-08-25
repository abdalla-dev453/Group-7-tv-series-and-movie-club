import ClubCard from './ClubCard';
import './ClubGrid.css';

const ClubGrid = ({
  clubs = [],
  loading = false,
  error = null,
  onMembershipChange,
}) => {
  if (loading) {
    return (
      <div className="club-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="club-skeleton" key={index}>
            <div className="club-skeleton__cover" />

            <div className="club-skeleton__body">
              <div className="club-skeleton__line club-skeleton__line--large" />
              <div className="club-skeleton__line" />
              <div className="club-skeleton__line club-skeleton__line--small" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="club-grid__state">
        <div className="club-grid__icon">!</div>
        <h3>Couldn't load clubs</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (clubs.length === 0) {
    return (
      <div className="club-grid__state">
        <div className="club-grid__icon">🎬</div>
        <h3>No clubs yet</h3>
        <p>
          Be the first person to create a community.
        </p>
      </div>
    );
  }

  return (
    <div className="club-grid">
      {clubs.map((club) => (
        <ClubCard
          key={club.id}
          club={club}
          onMembershipChange={onMembershipChange}
        />
      ))}
    </div>
  );
};

export default ClubGrid;
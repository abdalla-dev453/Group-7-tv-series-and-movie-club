import ClubCard from './ClubCard.jsx';
import theme from '../../theme.js';

const ClubGrid = ({ clubs = [], loading = false }) => {
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: theme.color.textDim }}>
        Loading clubs...
      </div>
    );
  }

  if (!clubs.length) {
    return (
      <div
        style={{
          background: theme.color.coalCard,
          border: `1px solid ${theme.color.coalBorder}`,
          borderRadius: theme.radius.md,
          padding: 40,
          textAlign: 'center',
          color: theme.color.textDim,
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 10 }}>🎬</div>
        <p style={{ margin: 0, fontSize: 14 }}>No clubs found.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 20,
      }}
    >
      {clubs.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  );
};

export default ClubGrid;
const ClubCard = ({ club }) => (
  <article className="card">
    <h3>{club?.name || 'Club name'}</h3>
    <p>{club?.description || 'Community description'}</p>
  </article>
);

export default ClubCard;

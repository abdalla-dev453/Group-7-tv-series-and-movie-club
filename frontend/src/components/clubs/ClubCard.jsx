const ClubCard = ({ name, members }) => (
  <article className='club-card'>
    <h3>{name}</h3>
    <p>{members} members</p>
  </article>
);

export default ClubCard;

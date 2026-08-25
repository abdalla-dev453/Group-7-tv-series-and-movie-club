const ClubGrid = ({ clubs }) => (
  <section className='club-grid'>
    {Array.isArray(clubs) && clubs.length ? clubs.map((club) => <div key={club.id}>{club.name}</div>) : <p>No clubs yet.</p>}
  </section>
);

export default ClubGrid;

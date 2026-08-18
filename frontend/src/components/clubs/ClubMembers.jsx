const ClubMembers = ({ members = [] }) => (
  <ul className='club-members'>
    {members.map((member) => <li key={member}>{member}</li>)}
  </ul>
);

export default ClubMembers;

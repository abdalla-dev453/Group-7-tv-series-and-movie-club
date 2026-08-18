const UserCard = ({ name = 'User' }) => (
  <article className='user-card'>
    <h3>{name}</h3>
    <p>Member profile</p>
  </article>
);

export default UserCard;

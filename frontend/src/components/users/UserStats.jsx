const UserStats = ({ followers = 0, following = 0 }) => (
  <div className='user-stats'>
    <span>{followers} followers</span>
    <span>{following} following</span>
  </div>
);

export default UserStats;

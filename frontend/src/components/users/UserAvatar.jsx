const UserAvatar = ({ name = 'U' }) => <div className='user-avatar'>{String(name || 'U').slice(0, 1).toUpperCase()}</div>;

export default UserAvatar;

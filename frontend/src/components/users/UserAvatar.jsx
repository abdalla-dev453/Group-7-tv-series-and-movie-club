const UserAvatar = ({ name = 'U' }) => <div className='user-avatar'>{name.slice(0, 1).toUpperCase()}</div>;

export default UserAvatar;

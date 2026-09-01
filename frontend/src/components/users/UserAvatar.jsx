const DEFAULT_SIZE = 256;

const UserAvatar = ({ name = 'U', imageUrl = '', size = DEFAULT_SIZE, className = '' }) => {
  const initials = String(name || 'U').slice(0, 1).toUpperCase();

  if (imageUrl) {
    return (
      <img
        className={`user-avatar ${className}`.trim()}
        src={imageUrl}
        alt={`${String(name || 'User')} profile picture`}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'cover', borderRadius: '50%' }}
      />
    );
  }

  return <div className={`user-avatar ${className}`.trim()}>{initials}</div>;
};

export default UserAvatar;

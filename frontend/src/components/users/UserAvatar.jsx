import theme from '../../theme.js';

const UserAvatar = ({ user, size = 44 }) => {
  const username = user?.username || 'User';
  const imageUrl = user?.url;

  const initial = username.charAt(0).toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: '50%',
        overflow: 'hidden',
        background: `linear-gradient(
          135deg,
          ${theme.color.amberSoft},
          ${theme.color.goldDeep}
        )`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1a1204',
        fontSize: Math.max(12, size * 0.38),
        fontWeight: 700,
        border: `1px solid ${theme.color.coalBorder}`,
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${username}'s profile`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        initial
      )}
    </div>
  );
};

export default UserAvatar;
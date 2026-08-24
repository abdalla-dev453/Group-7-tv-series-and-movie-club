import { Link } from 'react-router-dom';
import theme from '../../theme.js';
import UserAvatar from './UserAvatar.jsx';
import UserStats from './UserStats.jsx';

const UserCard = ({
  user,
  showStats = true,
}) => {
  if (!user) {
    return null;
  }

  const userId =
    user.id ||
    user.user_id;

  const username =
    user.username ||
    user.name ||
    'User';

  const email =
    user.email ||
    '';

  const bio =
    user.bio ||
    user.about ||
    'No bio yet.';

  const profilePath = userId
    ? `/profile/${userId}`
    : '#';

  return (
    <div
      style={{
        background: theme.color.coalCard,
        border: `1px solid ${theme.color.coalBorder}`,
        borderRadius: theme.radius.md,
        padding: 20,
        boxShadow: theme.shadow.card,
      }}
    >
      {/* Profile header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <UserAvatar
          user={user}
          size={56}
        />

        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Link
            to={profilePath}
            style={{
              color: theme.color.text,
              fontFamily: theme.font.heading,
              fontSize: 17,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            {username}
          </Link>

          {email && (
            <div
              style={{
                color: theme.color.textFaint,
                fontSize: 12,
                marginTop: 3,
              }}
            >
              {email}
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      <p
        style={{
          color: theme.color.textDim,
          fontSize: 13,
          lineHeight: 1.5,
          margin: '14px 0',
        }}
      >
        {bio}
      </p>

      {/* Statistics */}
      {showStats && (
        <UserStats user={user} />
      )}
    </div>
  );
};

export default UserCard;
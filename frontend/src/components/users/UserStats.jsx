import theme from '../../theme.js';

const UserStats = ({
  user,
  followers,
  following,
  posts,
}) => {
  const followerCount =
    followers ??
    user?.followersCount ??
    user?.followers_count ??
    user?.followers?.length ??
    0;

  const followingCount =
    following ??
    user?.followingCount ??
    user?.following_count ??
    user?.following?.length ??
    0;

  const postCount =
    posts ??
    user?.postCount ??
    user?.postsCount ??
    user?.posts_count ??
    user?.posts?.length ??
    0;

  const stats = [
    {
      label: 'Posts',
      value: postCount,
    },
    {
      label: 'Followers',
      value: followerCount,
    },
    {
      label: 'Following',
      value: followingCount,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        padding: '16px 0',
        borderTop: `1px solid ${theme.color.coalBorder}`,
        borderBottom: `1px solid ${theme.color.coalBorder}`,
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          style={{
            textAlign: 'center',
            minWidth: 70,
          }}
        >
          <div
            style={{
              color: theme.color.text,
              fontSize: 18,
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {stat.value}
          </div>

          <div
            style={{
              color: theme.color.textFaint,
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
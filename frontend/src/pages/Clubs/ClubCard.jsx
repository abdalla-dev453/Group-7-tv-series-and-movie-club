import { Link } from 'react-router-dom';
import JoinClubButton from './JoinClubButton';
import './ClubCard.css';

const getInitials = (name = '') => {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

const formatNumber = (number = 0) => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number;
};

const ClubCard = ({ club, onMembershipChange }) => {
  if (!club) return null;

  const memberCount =
    club.member_count ??
    club.members_count ??
    club.members?.length ??
    0;

  const postCount =
    club.post_count ??
    club.posts_count ??
    club.posts?.length ??
    0;

  const image =
    club.background_url ||
    club.cover_image ||
    club.coverImage ||
    club.image ||
    club.avatar;

  return (
    <article
      className="club-card"
      style={{
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Link
        to={`/clubs/${club.id}`}
        className="club-card__link"
        style={{
          display: 'block',
          width: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
          textDecoration: 'none',
        }}
      >
        {/* ================= COVER ================= */}
        <div
          className="club-card__cover"
          style={{
            width: '100%',
            minWidth: 0,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {image ? (
            <img
              src={image}
              alt={`${club.name} cover`}
              className="club-card__cover-image"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                backgroundColor: '#181611',
              }}
            />
          ) : (
            <div className="club-card__placeholder">
              {getInitials(club.name)}
            </div>
          )}

          <div className="club-card__gradient" />

          {club.is_private && (
            <span className="club-card__privacy">
              🔒 Private
            </span>
          )}
        </div>

        {/* ================= CONTENT ================= */}
        <div
          className="club-card__content"
          style={{
            minWidth: 0,
            boxSizing: 'border-box',
          }}
        >
          {/* Avatar */}
          <div
            className="club-card__avatar"
            style={{
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {image ? (
              <img
                src={image}
                alt=""
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  backgroundColor: '#181611',
                }}
              />
            ) : (
              <span>{getInitials(club.name)}</span>
            )}
          </div>

          {/* Main content */}
          <div
            className="club-card__main"
            style={{
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            <h3
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {club.name}
            </h3>

            <p
              style={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {club.description ||
                'A community for movie and TV lovers.'}
            </p>

            <div className="club-card__stats">
              <span>
                <strong>{formatNumber(memberCount)}</strong>{' '}
                members
              </span>

              <span>
                <strong>{formatNumber(postCount)}</strong>{' '}
                posts
              </span>
            </div>
          </div>

          {/* Join button */}
          <div
            className="club-card__button"
            style={{
              flexShrink: 0,
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <JoinClubButton
              clubId={club.id}
              isMember={club.is_member}
              isAdmin={club.is_admin}
              onMembershipChange={onMembershipChange}
            />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ClubCard;
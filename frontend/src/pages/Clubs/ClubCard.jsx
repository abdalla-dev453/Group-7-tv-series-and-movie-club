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
    club.cover_image ||
    club.coverImage ||
    club.image ||
    club.avatar;

  return (
    <article className="club-card">
      <Link to={`/clubs/${club.id}`} className="club-card__link">
        <div className="club-card__cover">
          {image ? (
            <img
              src={image}
              alt={`${club.name} cover`}
              className="club-card__cover-image"
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

        <div className="club-card__content">
          <div className="club-card__avatar">
            {image ? (
              <img src={image} alt="" />
            ) : (
              <span>{getInitials(club.name)}</span>
            )}
          </div>

          <div className="club-card__main">
            <h3>{club.name}</h3>

            <p>
              {club.description ||
                'A community for movie and TV lovers.'}
            </p>

            <div className="club-card__stats">
              <span>
                <strong>{formatNumber(memberCount)}</strong>
                {' '}members
              </span>

              <span>
                <strong>{formatNumber(postCount)}</strong>
                {' '}posts
              </span>
            </div>
          </div>

          <div
            className="club-card__button"
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
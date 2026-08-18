const FollowButton = ({ isFollowing = false }) => (
  <button type="button" className="button button--secondary">
    {isFollowing ? 'Following' : 'Follow'}
  </button>
);

export default FollowButton;

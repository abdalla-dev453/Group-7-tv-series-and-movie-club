const PostCard = ({ title = 'Post Title' }) => (
  <article className='post-card'>
    <h3>{title}</h3>
    <p>Community discussion goes here.</p>
  </article>
);

export default PostCard;

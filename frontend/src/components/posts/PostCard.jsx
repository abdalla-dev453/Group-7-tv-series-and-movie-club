const PostCard = ({ title = 'Post Title', content = 'Community discussion goes here.' }) => (
  <article className='post-card'>
    <h3>{title}</h3>
    <p>{content}</p>
  </article>
);

export default PostCard;

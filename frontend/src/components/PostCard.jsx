const PostCard = ({ post }) => (
  <article className="card">
    <h3>{post?.title || 'Untitled post'}</h3>
    <p>{post?.content || 'No content available.'}</p>
  </article>
);

export default PostCard;

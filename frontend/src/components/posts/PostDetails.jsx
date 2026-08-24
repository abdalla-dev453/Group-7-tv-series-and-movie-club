const PostDetails = ({ title = 'Post Details', content = 'Full post content appears here.' }) => (
  <article className='post-details'>
    <h2>{title}</h2>
    <p>{content}</p>
  </article>
);

export default PostDetails;

const CommentSection = ({ comments = [] }) => (
  <section className='comment-section'>
    {comments.length ? comments.map((comment, index) => {
      const commentId = typeof comment === 'object' ? comment.id : null;
      const commentText = typeof comment === 'object' ? comment.text : comment;

      return <p key={commentId || `comment-${index}`}>{commentText}</p>;
    }) : <p>No comments yet.</p>}
  </section>
);

export default CommentSection;

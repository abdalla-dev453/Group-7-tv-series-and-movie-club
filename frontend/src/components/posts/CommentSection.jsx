const CommentSection = ({ comments = [] }) => (
  <section className='comment-section'>
    {comments.length ? comments.map((comment) => <p key={comment}>{comment}</p>) : <p>No comments yet.</p>}
  </section>
);

export default CommentSection;

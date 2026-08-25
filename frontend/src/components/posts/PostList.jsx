const PostList = ({ posts }) => (
  <section className='post-list'>
    {Array.isArray(posts) && posts.length ? posts.map((post) => <div key={post.id}>{post.movie_title || post.title || 'Untitled post'}</div>) : <p>No posts yet.</p>}
  </section>
);

export default PostList;

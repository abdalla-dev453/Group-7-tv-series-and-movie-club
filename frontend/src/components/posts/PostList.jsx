const PostList = ({ posts = [] }) => (
  <section className='post-list'>
    {posts.length ? posts.map((post) => <div key={post.id}>{post.title}</div>) : <p>No posts yet.</p>}
  </section>
);

export default PostList;

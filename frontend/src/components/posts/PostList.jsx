import PostCard from './PostCard';

const PostList = ({ posts = [] }) => (
  <section className='post-list'>
    {posts.length
      ? posts.map((post, index) => (
          <PostCard
            key={post.id || `post-${index}`}
            title={post.title || post.movie_title}
            content={post.content || post.description}
          />
        ))
      : <p>No posts yet.</p>}
  </section>
);

export default PostList;

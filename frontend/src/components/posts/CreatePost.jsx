import { useState } from 'react';

const CreatePost = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedContent = content.trim();

    if (!trimmedContent) return;

    onSubmit?.(trimmedContent);
    setContent('');
  };

  return (
    <form className='create-post' onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder='Share your thoughts...'
      />
      <button type='submit' disabled={!content.trim()}>Post</button>
    </form>
  );
};

export default CreatePost;

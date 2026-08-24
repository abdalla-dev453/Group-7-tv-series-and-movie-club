const LikeButton = ({ count = 0, liked = false, onToggle }) => (
	<button type='button' aria-pressed={liked} onClick={onToggle}>
		{liked ? 'Unlike' : 'Like'} ({count})
	</button>
);

export default LikeButton;

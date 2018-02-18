import React from 'react';
import PropTypes from 'prop-types';

import Post from '../components/Post';
const PostsBoard = ({ posts, onUpvotePost, onDownvotePost }) => (
	<tr className="home-container">
		<td>
			<table className="home-content">
				{posts.map((post, index) => (
					<Post
						post={post}
						onUpvote={onUpvotePost}
						onDownvote={onDownvotePost}
						rank={index + 1}
						key={index}
						isRankDisplayed={true}
						isVoteButtonDisplayed={true}
					/>
				))}
			</table>
		</td>
	</tr>
);

PostsBoard.propTypes = {
	posts: PropTypes.array.isRequired,
	onUpvotePost: PropTypes.func.isRequired,
	onDownvotePost: PropTypes.func.isRequired,
};

export default PostsBoard;

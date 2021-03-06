import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from '../components/Post';
class PostsBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sortedBy: '',
		};
	}

	sortByScore = () => {
		this.props.posts.sort(
			(first, second) => second.voteScore - first.voteScore,
		);
		this.setState({ sortedBy: 'voteScore' });
	};

	sortByDate = () => {
		this.props.posts.sort(
			(first, second) => second.timestamp - first.timestamp,
		);
		this.setState({ sortedBy: 'date' });
	};

	render() {
		const { posts, onUpvotePost, onDownvotePost } = this.props;

		return (
			<tr className="home-container">
				<td>
					<button onClick={this.sortByScore}>Hot</button>
					<button onClick={this.sortByDate}>Newest</button>

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
	}
}

PostsBoard.propTypes = {
	posts: PropTypes.array.isRequired,
	onUpvotePost: PropTypes.func.isRequired,
	onDownvotePost: PropTypes.func.isRequired,
};

export default PostsBoard;

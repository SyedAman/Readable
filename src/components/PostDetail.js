import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import moment from 'moment';

import postPropType from '../utils/proptypes/postPropType';
import Post from './Post';

const PostDetail = ({
	post,
	comments,
	onUpvotePost,
	onDownvotePost,
	onAddCommentToPost,
}) => (
	<tr className="post-detail-container">
		<td>
			<table>
				<Post
					post={post}
					onUpvote={onUpvotePost}
					onDownvote={onDownvotePost}
					isRankDisplayed={false}
					isVoteButtonDisplayed={true}
				/>

				<tbody>
					<tr>
						<td>
							<p className="post-body">{post.body}</p>

							<div>
								<textarea
									ref={htmlElement =>
										(this.htmlElementForCommentBodyInput = htmlElement)
									}
									rows="4"
									cols="50"
									placeholder="comment body..."
								/>
								<input
									ref={htmlElement =>
										(this.htmlElementForCommentAuthorInput = htmlElement)
									}
									placeholder="comment author..."
								/>
								<button
									onClick={() => {
										const commentData = {
											author: this.htmlElementForCommentAuthorInput.value,
											body: this.htmlElementForCommentBodyInput.value,
											postId: post.id,
											id: uniqid(),
										};

										if (
											commentData.author &&
											commentData.body &&
											commentData.postId &&
											commentData.id
										) {
											onAddCommentToPost(commentData);
											this.htmlElementForCommentAuthorInput.value = '';
											this.htmlElementForCommentBodyInput.value = '';
										}
									}}
									type="submit"
								>
									add comment
								</button>
							</div>

							<div className="comment-section">
								<h2 className="comment-section-header">Comments</h2>
								<ul className="comment-section-comment-list">
									{comments.map(({ id, author, body, points, timestamp }) => (
										<li key={id} className="comment">
											<h6 className="comment-author">{`${author} ${moment(
												timestamp,
											)
												.startOf('second')
												.fromNow()}`}</h6>
											<p className="comment-author">{body}</p>
										</li>
									))}
								</ul>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</td>
	</tr>
);

Post.propTypes = {
	post: postPropType,
	onUpvote: PropTypes.func.isRequired,
	onDownvote: PropTypes.func.isRequired,
	comments: PropTypes.array.isRequired,
	onAddCommentToPost: PropTypes.func.isRequired,
};

export default PostDetail;

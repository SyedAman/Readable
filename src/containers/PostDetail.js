import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import moment from 'moment';

import postPropType from '../utils/proptypes/postPropType';
import Post from '../components/Post';
import UpvoteButton from '../components/UpvoteButton';
import DownvoteButton from '../components/DownvoteButton';
import * as actionCreators from '../actions';

class PostDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditDialogShowing: false,
			updatedPostBody: '',
		};
	}

	async componentDidMount() {
		await this.props.fetchComments(this.props.post.id);
	}

	handleUpdatedPostBodyChange = event => {
		this.setState({
			updatedPostBody: event.target.value,
		});
	};

	updateComment = commentToUpdate => {
		this.setState({
			isEditDialogShowing: false,
		});

		this.props.editComment(commentToUpdate);
	};

	render() {
		const {
			post,
			onUpvotePost,
			onDownvotePost,
			upvoteComment,
			downvoteComment,
			addComment,
			deleteComment,
		} = this.props;

		return (
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
													parentId: post.id,
													id: uniqid(),
												};

												if (
													commentData.author &&
													commentData.body &&
													commentData.parentId &&
													commentData.id
												) {
													addComment(commentData);
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
											{Object.keys(this.props.allComments)
												.filter(
													commentId =>
														this.props.allComments[commentId].parentId ===
														post.id,
												)
												.map(commentId => this.props.allComments[commentId])
												.map(comment => {
													const {
														id,
														author,
														body,
														voteScore,
														timestamp,
													} = comment;

													return (
														<li key={id} className="comment">
															<h6 className="comment-author">
																{`${voteScore} points by ${author} ${moment(
																	timestamp,
																)
																	.startOf('second')
																	.fromNow()}`}
																<span
																	onClick={async () => {
																		try {
																			await this.setState(previousState => ({
																				isEditDialogShowing: !previousState.isEditDialogShowing,
																				commentBeingEditted: id,
																				updatedPostBody: body,
																			}));
																		} catch (error) {
																			throw new Error(error);
																		}
																	}}
																	style={{ paddingLeft: '10px' }}
																>
																	✎
																</span>
																<span
																	onClick={() => {
																		deleteComment({
																			id,
																			postId: post.id,
																		});
																	}}
																	style={{ paddingLeft: '10px' }}
																>
																	❌
																</span>
															</h6>

															{this.state.isEditDialogShowing &&
															this.state.commentBeingEditted === id ? (
																<div>
																	<textarea
																		onChange={this.handleUpdatedPostBodyChange}
																		value={this.state.updatedPostBody}
																		row="4"
																		col="50"
																	/>
																	<button
																		onClick={() => {
																			this.updateComment({
																				id,
																				body: this.state.updatedPostBody,
																			});
																		}}
																		type="submit"
																	>
																		Update Comment
																	</button>
																</div>
															) : (
																<p className="comment-author">{body}</p>
															)}

															<UpvoteButton
																thingToUpvote={comment}
																onUpvote={upvoteComment}
															/>
															<DownvoteButton
																thingToDownvote={comment}
																onDownvote={downvoteComment}
															/>
														</li>
													);
												})}
										</ul>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		);
	}
}

const mapStateToProps = currentState => ({
	allComments: currentState.comments.byId,
});

const mapDispatchToProps = dispatch => ({
	fetchComments: postId =>
		dispatch(actionCreators.fetchCommentsForPost(postId)),
	upvoteComment: commentId => dispatch(actionCreators.upvoteComment(commentId)),
	downvoteComment: commentId =>
		dispatch(actionCreators.downvoteComment(commentId)),
	deleteComment: commentToDelete =>
		dispatch(actionCreators.deleteComment(commentToDelete)),
	editComment: commentToEdit =>
		dispatch(actionCreators.editComment(commentToEdit)),
	addComment: commentData => dispatch(actionCreators.addComment(commentData)),
});

Post.propTypes = {
	post: postPropType,
	allComments: PropTypes.object.isRequired,
	onUpvotePost: PropTypes.func.isRequired,
	onDownvotePost: PropTypes.func.isRequired,
	upvoteComment: PropTypes.func.isRequired,
	downvoteComment: PropTypes.func.isRequired,
	addComment: PropTypes.func.isRequired,
	deleteComment: PropTypes.func.isRequired,
	editComment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

import uniqid from 'uniqid';

import * as actionTypes from './actionTypes';

export const createPost = ({ title, author, body }) => ({
	type: actionTypes.CREATE_POST_ACTION_TYPE,
	payload: {
		id: uniqid(),
		title,
		author,
		body,
		points: 1,
		timestamp: Date.now(),
		comments: [],
	},
});

export const editPost = ({ id, title, body }) => ({
	type: actionTypes.EDIT_POST_ACTION_TYPE,
	payload: {
		id,
		title,
		body,
	},
});

export const deletePost = ({ id, comments }) => ({
	type: actionTypes.DELETE_POST_ACTION_TYPE,
	payload: {
		id,
		comments,
	},
});

export const upvotePost = postId => ({
	type: actionTypes.UPVOTE_POST_ACTION_TYPE,
	payload: {
		postId,
	},
});

export const downvotePost = postId => ({
	type: actionTypes.DOWNVOTE_POST_ACTION_TYPE,
	payload: {
		postId,
	},
});

export const addComment = ({ id, postId, author, body }) => ({
	type: actionTypes.ADD_COMMENT_ACTION_TYPE,
	payload: {
		id,
		postId,
		author,
		body,
		points: 1,
		timestamp: Date.now(),
	},
});

export const editComment = ({ id, title, body }) => ({
	type: actionTypes.EDIT_COMMENT_ACTION_TYPE,
	payload: {
		id,
		title,
		body,
	},
});

export const deleteComment = ({ id, postId }) => ({
	type: actionTypes.DELETE_COMMENT_ACTION_TYPE,
	payload: {
		postId,
		id,
	},
});

export const upvoteComment = commentId => ({
	type: actionTypes.UPVOTE_COMMENT_ACTION_TYPE,
	payload: {
		commentId,
	},
});

export const downvoteComment = commentId => ({
	type: actionTypes.DOWNVOTE_COMMENT_ACTION_TYPE,
	payload: {
		commentId,
	},
});

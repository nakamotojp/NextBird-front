import produce from 'immer';

export const initialState = {
	mainPosts: [],
	imagePaths: [], // Preview image path
	addPostErrorReason: '', // Post upload error reason
	isAddingPost: false, // Post uploading
	addedPost: false, // Post upload success
	isAddingComment: false, // Comment uploading
	addedComment: false, // Comment upload success
	addCommentErrorReason: '',
	hasMorePost: false,
	singlePost: null
};

// ASYNCHRONOUS PATTERN
export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case ADD_POST_REQUEST: {
				draft.isAddingPost = true;
				draft.addPostErrorReason = '';
				draft.addedPost = false;
				break;
			}
			case ADD_POST_SUCCESS: {
				draft.isAddingPost = false;
				draft.mainPosts.unshift(action.data);
				draft.addedPost = true;
				draft.imagePaths = [];
				break;
			}
			case ADD_POST_FAILURE: {
				draft.isAddingPost = false;
				draft.addPostErrorReason = action.error;
				break;
			}
			case LOAD_HASHTAG_POSTS_REQUEST:
			case LOAD_USER_POSTS_REQUEST:
			case LOAD_MAIN_POSTS_REQUEST: {
				draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
				draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
				break;
			}
			case LOAD_HASHTAG_POSTS_SUCCESS:
			case LOAD_USER_POSTS_SUCCESS:
			case LOAD_MAIN_POSTS_SUCCESS: {
				action.data.forEach((d) => {
					draft.mainPosts.push(d);
				});
				draft.hasMorePost = action.data.length === 10;
				break;
			}
			case LOAD_HASHTAG_POSTS_FAILURE:
			case LOAD_USER_POSTS_FAILURE:
			case LOAD_MAIN_POSTS_FAILURE: {
				break;
			}
			case ADD_COMMENT_REQUEST: {
				draft.isAddingComment = true;
				draft.addCommentErrorReason = '';
				draft.addedComment = false;
				break;
			}
			case ADD_COMMENT_SUCCESS: {
				const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.postId);
				draft.mainPosts[postIndex].Comments.push(action.data.comment);
				draft.isAddingComment = false;
				draft.addedComment = true;
				break;
			}
			case ADD_COMMENT_FAILURE: {
				draft.isAddingComment = false;
				draft.addCommentErrorReason = action.error;
				break;
			}
			case LOAD_COMMENTS_SUCCESS: {
				const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.postId);
				draft.mainPosts[postIndex].Comments = action.data.comments;
				break;
			}
			case UPLOAD_IMAGES_REQUEST: {
				break;
			}
			case UPLOAD_IMAGES_SUCCESS: {
				action.data.forEach((p) => {
					draft.imagePaths.push(p);
				});
				break;
			}
			case UPLOAD_IMAGES_FAILURE: {
				break;
			}
			case REMOVE_IMAGE: {
				const index = draft.imagePaths.findIndex((__: string, i: number) => i !== action.index);
				draft.imagePaths.splice(index, 1);
				break;
			}
			case LIKE_POST_REQUEST: {
				break;
			}
			case LIKE_POST_SUCCESS: {
				const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.postId);
				draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });
				break;
			}
			case LIKE_POST_FAILURE: {
				break;
			}
			case UNLIKE_POST_REQUEST: {
				break;
			}
			case UNLIKE_POST_SUCCESS: {
				const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.postId);
				const likeIndex = draft.mainPosts[postIndex].Likers.findIndex((v) => v.id === action.data.userId);
				draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);
				break;
			}
			case UNLIKE_POST_FAILURE: {
				break;
			}
			case RETWEET_REQUEST: {
				break;
			}
			case RETWEET_SUCCESS: {
				draft.mainPosts.unshift(action.data);
				break;
			}
			case RETWEET_FAILURE: {
				break;
			}
			case REMOVE_POST_REQUEST: {
				break;
			}
			case REMOVE_POST_SUCCESS: {
				const index = draft.mainPosts.findIndex((v) => v.id === action.data);
				draft.mainPosts.splice(index, 1);
				break;
			}
			case REMOVE_POST_FAILURE: {
				break;
			}
			case LOAD_POST_SUCCESS: {
				draft.singlePost = action.data;
				break;
			}
			default: {
				break;
			}
		}
	});
};

export default reducer;

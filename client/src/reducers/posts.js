import {
	FETCH_BY_SEARCH,
	FETCH_ALL,
	LIKE_POST,
	UPDATE,
	DELETE,
	CREATE,
	START_LOADING,
	END_LOADING,
	FETCH_POST
} from '../constants/actionTypes';
const posts = (state = { posts: [], isLoading: true }, action) => {
	switch (action.type) {
		case START_LOADING:
			return { ...state, isLoading: true };
		case END_LOADING:
			return { ...state, isLoading: false };
		case FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages
			};
		case CREATE:
			return { ...state, posts: [ ...state.posts, action.payload ] };
		case UPDATE:
			return {
				...state,
				posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
			};
		case DELETE:
			return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
		case LIKE_POST:
			return {
				...state,
				posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
			};
		// case SHOW_POST:
		// 	return posts.find((post) => post._id === action.payload.id);
		case FETCH_BY_SEARCH:
			return {
				...state,
				posts: action.payload
			};
		case FETCH_POST:
			return {
				...state,
				post: action.payload
			};
		default:
			return posts;
	}
};
export default posts;

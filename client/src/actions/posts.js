import * as api from '../api';
import {
	START_LOADING,
	END_LOADING,
	FETCH_BY_SEARCH,
	FETCH_ALL,
	LIKE_POST,
	UPDATE,
	DELETE,
	CREATE,
	SHOW_POST,
	FETCH_POST,
	START_ERROR
} from '../constants/actionTypes';

//ACTIOM CREATORS
export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPosts(page);
		// console.log(data);
		dispatch({ type: FETCH_ALL, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		dispatch({ type: START_ERROR, payload: error.response.data.message });
		console.log(error.message);
	}
};
export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPost(id);
		// console.log(data);
		dispatch({ type: FETCH_POST, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		dispatch({ type: START_ERROR, payload: error.response.data.message });
		console.log(error.message);
	}
};
export const getPostBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
		// console.log(data);
		dispatch({ type: END_LOADING });
	} catch (error) {
		dispatch({ type: START_ERROR, payload: error.response.data.message });
		console.log(error.message);
	}
};
export const createPost = (post) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.createPost(post);
		dispatch({ type: CREATE, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		dispatch({ type: START_ERROR, payload: error.response.data.message });
		console.log(error.message);
	}
};
export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		dispatch({ type: START_ERROR, payload: error.response.data.message });
		console.log(error.message);
	}
};
export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		dispatch({ type: START_ERROR, payload: error.response.data.message });
		console.log(error);
	}
};
export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: LIKE_POST, payload: data });
	} catch (error) {
		dispatch({ type: START_ERROR, payload: error.response.data.message });
		console.log(error);
	}
};
export const showPost = (id) => async (dispatch) => {
	try {
		const { data } = await api.showPost(id);
		dispatch({ type: SHOW_POST, payload: data });
	} catch (error) {
		dispatch({ type: START_ERROR, payload: error.response.data.message });
		console.log(error);
	}
};

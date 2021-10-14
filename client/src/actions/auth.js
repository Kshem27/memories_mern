import * as api from '../api';
import { AUTH, START_ERROR } from '../constants/actionTypes';

export const signin = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signin(formData);
		dispatch({ type: AUTH, data: data });
		history.push('/');
	} catch (error) {
		console.log(error);
		// console.log('hello');
		dispatch({ type: START_ERROR, payload: error.response.data.message });
	}
};
export const signup = (formData, history) => async (dispatch) => {
	try {
		//signup the user
		const { data } = await api.signup(formData);
		dispatch({ type: AUTH, data });
		history.push('/');
	} catch (error) {
		console.log(error);
		dispatch({ type: START_ERROR, payload: error.response.data.message });
	}
};

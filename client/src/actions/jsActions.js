import {
	CREATE_JS,
	GET_JSS,
	UPDATE_JS,
	TOGGLE_JS_MODAL,
	GET_JS,
	DELETE_JS,
	FILTER_JS,
	UPDATE_JS_FAIL,
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { setAlert } from './alertActions';
import axios from 'axios';

export const getAllJs = () => (dispatch, getState) => {
	axios
		.get('/api/js', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: GET_JSS,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const getJs = (id) => (dispatch, getState) => {
	axios
		.get(`/api/js/${id}`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_JS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const addJs = (newJS) => (dispatch, getState) => {
	// create a JS without photo
	axios
		.post('/api/js/add', newJS, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: CREATE_JS,
				payload: res.data,
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateJs = (JS) => (dispatch, getState) => {
	axios
		.post(`/api/js/update`, JS, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: UPDATE_JS,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_JS_FAIL'));
			dispatch({
				type: UPDATE_JS_FAIL,
			});
		});
};

export const deleteJs = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/js/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_JS,
				payload: id,
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const filterJs = (filters) => (dispatch) => {
	dispatch({
		type: FILTER_JS,
		payload: {
			filters: filters,
		},
	});
};

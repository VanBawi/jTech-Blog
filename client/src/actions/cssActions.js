import {
	CREATE_CSS,
	GET_CSSS,
	UPDATE_CSS,
	TOGGLE_CSS_MODAL,
	GET_CSS,
	DELETE_CSS,
	FILTER_CSS,
	UPDATE_CSS_FAIL,
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { setAlert } from './alertActions';
import axios from 'axios';

export const getAllCss = () => (dispatch, getState) => {
	axios
		.get('/api/css', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: GET_CSSS,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const getCss = (id) => (dispatch, getState) => {
	axios
		.get(`/api/css/${id}`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_CSS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const addCss = (newCss) => (dispatch, getState) => {
	// create a Css without photo
	axios
		.post('/api/css/add', newCss, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: CREATE_CSS,
				payload: res.data,
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateCss = (Css) => (dispatch, getState) => {
	axios
		.post(`/api/css/update`, Css, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: UPDATE_CSS,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_CSS_FAIL'));
			dispatch({
				type: UPDATE_CSS_FAIL,
			});
		});
};

export const deleteCss = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/css/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_CSS,
				payload: id,
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const filterCss = (filters) => (dispatch) => {
	dispatch({
		type: FILTER_CSS,
		payload: {
			filters: filters,
		},
	});
};

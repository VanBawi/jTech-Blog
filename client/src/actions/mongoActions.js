import {
	CREATE_MONGO,
	GET_MONGOS,
	UPDATE_MONGO,
	TOGGLE_MONGO_MODAL,
	GET_MONGO,
	DELETE_MONGO,
	FILTER_MONGO,
	UPDATE_MONGO_FAIL,
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { setAlert } from './alertActions';
import axios from 'axios';

export const getAllMongo = () => (dispatch, getState) => {
	axios
		.get('/api/mongo', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: GET_MONGOS,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const getMongo = (id) => (dispatch, getState) => {
	axios
		.get(`/api/mongo/${id}`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_MONGO,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const addMongo = (newMONGO) => (dispatch, getState) => {
	// create a MONGO without photo
	axios
		.post('/api/mongo/add', newMONGO, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: CREATE_MONGO,
				payload: res.data,
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateMongo = (MONGO) => (dispatch, getState) => {
	axios
		.post(`/api/mongo/update`, MONGO, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: UPDATE_MONGO,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_MONGO_FAIL'));
			dispatch({
				type: UPDATE_MONGO_FAIL,
			});
		});
};

export const deleteMongo = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/mongo/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_MONGO,
				payload: id,
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const filterMongo = (filters) => (dispatch) => {
	dispatch({
		type: FILTER_MONGO,
		payload: {
			filters: filters,
		},
	});
};

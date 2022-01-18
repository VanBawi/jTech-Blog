import axios from 'axios';
import { returnErrors } from './errorActions';

import {
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	RESET_SUCCESS,
	RESET_FAIL,
} from './types';

// Validate token and load user
export const loadUser = () => (dispatch, getState) => {
	axios
		.get('/api/auth/user', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

// @route POST api/users/register
// @desc Register user
// @access Public
export const register = ({ email, password, password2, name, permissionLevel }) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	//Request Body
	const body = JSON.stringify({
		email,
		name,
		password,
		password2,
		permissionLevel,
	});

	axios
		.post('api/users/register', body, config)
		.then((res) => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			// to add email object to database
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
			dispatch({
				type: REGISTER_FAIL,
			});
		});
};

//Login User
//@route api/auth/login
// access public
export const login = ({ email, password }) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	//Request Body
	const body = JSON.stringify({
		email,
		password,
	});
	axios
		.post('api/auth/login', body, config)
		.then((res) =>
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
			dispatch({
				type: LOGIN_FAIL,
			});
		});
};

//Logout User
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS,
	};
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
	//Get token from local storage.. refer to authR under src/reducers/index.js
	const token = getState().authR.token;
	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	//if there is a token then add it to the header
	if (token) {
		config.headers['x-auth-token'] = token;
	}

	return config;
};

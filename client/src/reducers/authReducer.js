import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	RESET_SUCCESS,
	RESET_FAIL,
	GET_USERS,
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('my-token'),
	isAuthenticated: false,
	isLoading: false,
	user: '',
	message: '',
	redirect: false,
	users: [], // getting all users
};

const authReducer = function (state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
			};
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case USER_LOADED:
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			if (action.payload.token) {
				localStorage.setItem('my-token', action.payload.token);
			}
			return {
				...state,
				token: action.payload.token ? action.payload.token : state.token,
				user: action.payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case LOGOUT_SUCCESS:
			localStorage.removeItem('my-token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isLoading: true,
				user: null,
			};

		case RESET_SUCCESS:
			return {
				...state,
				...action.payload,
				redirect: true,
			};
		case RESET_FAIL:
			return {
				...state,
				...action.payload,
				redirect: false,
			};
		default:
			return state;
	}
};

export default authReducer;

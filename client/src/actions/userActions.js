import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

import { GET_USERS } from './types';

// Getting All The Users
export const getUsers = () => (dispatch) => {
	axios
		.get(`/api/users`)
		.then((res) =>
			dispatch({
				type: GET_USERS,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

import { SET_ALERT, REMOVE_ALERT } from './types';

const idGenerator = () => {
	// The function generates Id consist of numbers and letters
	return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2); // The ID length is 22
};
export const setAlert = (msg, alertType) => (dispatch) => {
	const id = idGenerator();
	dispatch({
		type: SET_ALERT,
		payload: { msg, alertType, id },
	});

	setTimeout(
		() =>
			dispatch({
				type: REMOVE_ALERT,
				payload: id,
			}),
		10000
	);
};

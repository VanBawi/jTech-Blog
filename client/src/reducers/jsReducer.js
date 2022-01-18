import {
	CREATE_JS,
	GET_JSS,
	UPDATE_JS,
	TOGGLE_JS_MODAL,
	GET_JS,
	DELETE_JS,
	FILTER_JS,
	UPDATE_JS_FAIL,
} from '../actions/types';

const initialState = {
	blogs: [],
	blog: '',
	filteredBlogs: [],
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_JSS:
			return {
				...state,
				blogs: payload,
				loading: false,
			};
		case GET_JS:
			return {
				...state,
				blog: payload,
				loading: false,
			};
		case CREATE_JS:
			return {
				...state,
				blog: payload,
				blogs: [payload, ...state.blogs],
				loading: false,
			};
		case DELETE_JS:
			return {
				...state,
				blogs: state.blogs.filter((blog) => blog.id !== payload),
				loading: false,
			};
		case UPDATE_JS:
			return {
				...state,
				blog: payload,
				blogs: state.blogs.map((blog) => {
					if (blog._id === payload.id) {
						return payload;
					} else {
						return blog;
					}
				}),
				loading: false,
			};
		case FILTER_JS:
			var arr = state.blogs.filter((blog) =>
				Object.keys(action.payload.filters).every((key) => {
					if (Array.isArray(action.payload.filters[key])) {
						return action.payload.filters[key].some((keyEle) =>
							blog[key] ? blog[key].includes(keyEle) : false
						);
					}
					return blog[key]
						? blog[key].includes(action.payload.filters[key])
						: null;
				})
			);
			return {
				...state,
				filteredBlogs: arr,
			};
		default:
			return state;
	}
}

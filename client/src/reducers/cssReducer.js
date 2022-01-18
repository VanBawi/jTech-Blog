import {
	CREATE_CSS,
	GET_CSSS,
	UPDATE_CSS,
	TOGGLE_CSS_MODAL,
	GET_CSS,
	DELETE_CSS,
	FILTER_CSS,
	UPDATE_CSS_FAIL,
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
		case GET_CSSS:
			return {
				...state,
				blogs: payload,
				loading: false,
			};
		case GET_CSS:
			return {
				...state,
				blog: payload,
				loading: false,
			};
		case CREATE_CSS:
			return {
				...state,
				blog: payload,
				blogs: [payload, ...state.blogs],
				loading: false,
			};
		case DELETE_CSS:
			return {
				...state,
				blogs: state.blogs.filter((blog) => blog.id !== payload),
				loading: false,
			};
		case UPDATE_CSS:
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
		case FILTER_CSS:
			var arr = state.blogs.filter((blog) =>
				Object.keys(action.payload.filters).every((key) => {
					if (Array.isArray(action.payload.filters[key])) {
						return action.payload.filters[key].some((keyEle) =>
							blog[key] ? blog[key].includes(keyEle) : false
						);
					}
					return blog[key] ? blog[key].includes(action.payload.filters[key]) : null;
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

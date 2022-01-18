import {
	CREATE_BLOG,
	GET_BLOGS,
	UPDATE_BLOG,
	TOGGLE_BLOG_MODAL,
	GET_BLOG,
	DELETE_BLOG,
	FILTER_BLOG,
	UPDATE_BLOG_FAIL,
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { setAlert } from './alertActions';
import axios from 'axios';

export const getBlogs = () => (dispatch, getState) => {
	axios
		.get('/api/blogs', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: GET_BLOGS,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const getBlog = (id) => (dispatch, getState) => {
	axios
		.get(`/api/blog/${id}`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_BLOG,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const addBlog = (newBlog) => (dispatch, getState) => {
	// create a BLOG without photo
	axios
		.post('/api/blogs', newBlog, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: CREATE_BLOG,
				payload: res.data,
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateBlog = (blog) => (dispatch, getState) => {
	axios
		.post(`/api/blogs/update`, blog, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: UPDATE_BLOG,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_BLOG_FAIL'));
			dispatch({
				type: UPDATE_BLOG_FAIL,
			});
		});
};

export const deleteBlog = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/blogs/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_BLOG,
				payload: id,
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const filterBlogs = (filters) => (dispatch) => {
	dispatch({
		type: FILTER_BLOG,
		payload: {
			filters: filters,
		},
	});
};

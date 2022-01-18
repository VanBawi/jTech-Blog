import { combineReducers } from 'redux';

import authReducer from './authReducer';
import blogReducer from './blogReducer';
import errorReducer from './errorReducer';
import alertReducer from './alertReducer';
import cssReducer from './cssReducer';
import jsReducer from './jsReducer';
import mongoReducer from './mongoReducer';

const reducers = combineReducers({
	errorR: errorReducer,
	authR: authReducer,
	blogR: blogReducer,
	alertR: alertReducer,
	cssR: cssReducer,
	mongoR: mongoReducer,
	jsR: jsReducer,
});

export default reducers;

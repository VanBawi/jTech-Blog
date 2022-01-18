import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../actions/authActions';
import LandingPage from './LandingPage';

// import { tokenConfig } from './tokenConfig';

const requireAuth = (AuthComponent, requireAuth) => {
	const Authenticate = (props) => {
		const dispatch = useDispatch();

		useEffect(() => {
			dispatch(loadUser());
		}, []);

		const auth = useSelector((state) => state.authR);
		const { isAuthenticated, isLoading, user } = auth;

		return (
			<Fragment>
				{isAuthenticated || !requireAuth ? (
					<AuthComponent {...props} />
				) : (
					!isLoading && <LandingPage {...props} />
				)}
			</Fragment>
		);
	};
	return Authenticate;
};

export default requireAuth;

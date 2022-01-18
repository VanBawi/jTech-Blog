import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Container } from 'reactstrap';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Link, Redirect } from 'react-router-dom';

const LoginModal = () => {
	const dispatch = useDispatch();

	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const isAuthenticated = useSelector((state) => state.authR.isAuthenticated);

	const onSubmit = (e) => {
		e.preventDefault();
		// create a user object
		const user = {
			email,
			password,
		};
		//Attempt to Register
		dispatch(login(user));
	};

	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/blogs'></Redirect>;
	}

	return (
		<Container>
			<Fragment>
				<div className='form-center mt-5'>
					<h3 className='large primary-text' style={{ textAlign: 'center' }}>
						jTech Blog
					</h3>
					<br />
					<p className='form-subtitle'>Sign In</p>
					<hr />
					<form className='form' onSubmit={(e) => onSubmit(e)}>
						<div className='form-group '>
							<input
								type='email'
								placeholder='Email Address'
								name='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								placeholder='Password'
								name='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<input
							type='submit'
							style={{ background: '#17a2b8', color: '#fff' }}
							className='btn btn-custom'
							value='Login'
						/>
					</form>
					<br />
					<p className='my-1' style={{ textAlign: 'center' }}>
						Don't have an account?{' '}
						<Link to='/signup' style={{ color: '#17a2b8' }}>
							Sign Up
						</Link>
					</p>
				</div>
			</Fragment>
		</Container>
	);
};

export default LoginModal;

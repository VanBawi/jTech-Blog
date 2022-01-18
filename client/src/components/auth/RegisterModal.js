import React, { useState, Fragment, useEffect } from 'react';

import { Container, Alert } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const RegisterModal = ({ history }) => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [name, setName] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const err = useSelector((state) => state.errorR);
	const user = useSelector((state) => state.authR.user);

	// console.log('user', user);
	const onSubmit = (e) => {
		e.preventDefault();
		// create a user object
		const newUser = {
			name,
			email,
			password,
			password2,
			permissionLevel: 'Admin',
		};
		//Attempt to Register
		if (password !== password2) {
			// to add later
			alert('Passwords do not match');
			dispatch(clearErrors());
		} else {
			// register success alert to add later
			dispatch(register(newUser));
			setSubmitted(true);
		}
	};

	useEffect(() => {
		if (submitted && user) {
			history.push('/blogs');
		}
	}, [submitted, user]);

	return (
		<Container>
			<Fragment>
				<div className='form-center mt-5'>
					<h3 className='large primary-text' style={{ textAlign: 'center' }}>
						jTech Blog
					</h3>
					<br />
					<p className='form-subtitle'>Sign up for full access</p>
					<hr />
					{/* {err.message.map((e) => (
						<Alert color='danger'>{e} </Alert>
					))} */}
					<form className='form' onSubmit={(e) => onSubmit(e)}>
						<div className='form-group'>
							<input
								type='text'
								value={name}
								placeholder='Full Name'
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className='form-group'>
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
						<div className='form-group'>
							<input
								type='password'
								placeholder='Confirm Password'
								name='password2'
								value={password2}
								onChange={(e) => setPassword2(e.target.value)}
							/>
						</div>
						<input
							type='submit'
							style={{ background: '#17a2b8', color: '#fff' }}
							className='btn btn-custom'
							value='Sign Up'
						/>
					</form>
					<br />
					<p className='my-1' style={{ textAlign: 'center' }}>
						Already have an account?{' '}
						<Link to='/login' style={{ color: '#17a2b8' }}>
							Sign In
						</Link>
					</p>
				</div>
			</Fragment>
		</Container>
	);
};

export default RegisterModal;

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LandingPage = () => {
	const isAuthenticated = useSelector((state) => state.authR.isAuthenticated);

	if (isAuthenticated) {
		return <Redirect to='/blogs' />;
	}

	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Engage everyone, everywhere.</h1>
					<p className='lead'>Tools to teach and learn anything remotely.</p>
					<div>
						<Link to='/signup' className='btn btn-custom text-white'>
							Sign Up
						</Link>
						<p style={{ margin: '1rem' }}>
							Already have an account?{' '}
							<Link to='/login' style={{ color: '#17a2b8' }}>
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LandingPage;

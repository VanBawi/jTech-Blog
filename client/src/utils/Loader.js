import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {
	return (
		<div className='text-center'>
			<Spinner animation='border' role='status' variant='info'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		</div>
	);
};

export default Loader;

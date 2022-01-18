import React, { Fragment, useState } from 'react';
import { Button } from 'reactstrap';

const ConfirmButton = (props) => {
	const [displayModal, toggleModal] = useState(false);

	const alertPosition = {
		position: 'fixed' /* Stay in place */,
		zIndex: '1' /* Sit on top */,
		left: '0',
		top: '0',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(150,150,150,0.5)',
	};

	const alertContent = {
		backgroundColor: '#fefefe',
		margin: '23% auto' /* 15% from the top and centered */,
		padding: '20px',
		borderRadius: '5px',
		width: '17%',
	};

	const buttonAlign = {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '1rem',
	};

	return (
		<Fragment>
			<Button
				className={props.className}
				style={props.style}
				color={props.color}
				size={props.size}
				onClick={() => toggleModal(true)}>
				{props.children}
			</Button>
			{displayModal ? (
				<div style={alertPosition} onClick={() => toggleModal(false)}>
					<div style={alertContent}>
						<p style={{ textAlign: 'center' }}>{props.alertTitle}</p>
						<div style={buttonAlign}>
							<Button
								style={{ marginRight: '0.5rem' }}
								color='danger'
								size='sm'
								onClick={() => toggleModal(false)}>
								Cancel
							</Button>
							<Button
								color='success'
								size='sm'
								onClick={() => {
									toggleModal(false);
									props.onClick();
								}}>
								Confirm
							</Button>
						</div>
					</div>
				</div>
			) : null}
		</Fragment>
	);
};

export default ConfirmButton;

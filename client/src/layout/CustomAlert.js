import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const CustomAlert = (props) => {
	const [visible, setVisible] = useState(true);
	const onDismiss = () => setVisible(false);
	return (
		<Alert color={props.color} isOpen={visible} toggle={onDismiss}>
			{props.children}
		</Alert>
	);
};

export default CustomAlert;

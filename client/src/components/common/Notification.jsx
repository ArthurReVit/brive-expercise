import React from 'react';

const Notification = (props) => {
	return (
		<span className={`notification ${props.variant}`}>{props.content}</span>
	);
};

export default Notification;

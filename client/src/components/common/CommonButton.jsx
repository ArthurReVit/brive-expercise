import React from 'react';

const CommonButton = (props) => {
	return (
		<button
			onClick={props.onClick}
			className={`common-button ${props.variant}`}>
			{props.content}
		</button>
	);
};

export default CommonButton;

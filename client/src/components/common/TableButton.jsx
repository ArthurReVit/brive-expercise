import React from 'react';

const TableButton = (props) => {
	return (
		<button
			onClick={props.onClick}
			value={props.value}
			className='table-button'></button>
	);
};

export default TableButton;

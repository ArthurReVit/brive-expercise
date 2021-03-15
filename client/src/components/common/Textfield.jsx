import React from 'react';

const Textfield = (props) => {
	return (
		<div className='textfield-group'>
			<input
				autoComplete='off'
				type={props.type}
				placeholder={props.placeholder}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				className='textfield'
				required={props.required}
			/>
		</div>
	);
};

export default Textfield;

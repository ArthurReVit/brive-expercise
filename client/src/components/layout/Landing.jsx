import React, { useState } from 'react';

// Load common components

import CommonButton from '../common/CommonButton';
import Textfield from '../common/Textfield';

// Load feed components

import EmployeesFeed from '../feed/EmployeesFeed';
import AddEmployee from './AddEmployee';

const Landing = (props) => {
	const [stateData, setData] = useState({
		addUser: false,
	});

	const { addUser } = stateData;

	const onClosePopUp = (e) => {
		setData({ ...stateData, addUser: false });
	};
	const onOpenPopUp = (e) => {
		setData({ ...stateData, addUser: true });
	};

	return (
		<div className='main-content'>
			<span className='textfield-group search-bar-group'>
				<Textfield
					type='text'
					placeholder='Buscar'
					name={props.name}
					value={props.value}
					onChange={props.onChange}
				/>
			</span>
			<EmployeesFeed
				employees={props.employees}
				currency={props.currency}
				searchQuery={props.searchQuery}
			/>
			<CommonButton
				content='AGREGAR EMPLEADO'
				onClick={(e) => onOpenPopUp(e)}
				variant='button-green'
			/>
			{addUser ? <AddEmployee onCloseClick={(e) => onClosePopUp(e)} /> : null}
		</div>
	);
};

export default Landing;

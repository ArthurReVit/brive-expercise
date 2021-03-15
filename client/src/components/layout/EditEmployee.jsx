import React, { useState } from 'react';
import axios from 'axios';

// Load common components

import CommonButton from '../common/CommonButton';
import Textfield from '../common/Textfield';

const EditEmployee = (props) => {
	let employeeId = props.employeeId;

	const [formData, setFormData] = useState({
		employee: '',
		position: '',
		salary: '',
	});

	const { employee, position, salary } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		const updateEmployee = {
			employee,
			position,
			salary,
		};

		console.log(updateEmployee);

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const body = JSON.stringify(updateEmployee);

			const res = await axios.put(`api/workers/${employeeId}`, body, config);

			console.log(res.data);

			setFormData({
				...formData,
				backEndError: true,
				employee: '',
				position: '',
				salary: '',
			});
		} catch (err) {
			setFormData({
				...formData,
				addedUser: true,
			});

			console.error(err.response.data);
		}
	};

	return (
		<div className='add-employee-bg edit-employee-bg'>
			<div className='add-employee-content'>
				<form onSubmit={(e) => onSubmit(e)}>
					<span className='textfield-group add-employee-textfield'>
						<Textfield
							type='text'
							placeholder='Nombre completo del empleado'
							name='employee'
							value={employee}
							onChange={(e) => onChange(e)}
							required
						/>
					</span>
					<span className='textfield-group add-employee-textfield'>
						<Textfield
							type='text'
							placeholder='Cargo'
							name='position'
							value={position}
							onChange={(e) => onChange(e)}
							required
						/>
					</span>
					<span className='textfield-group add-employee-textfield'>
						<Textfield
							type='number'
							placeholder='Salario'
							name='salary'
							value={salary}
							onChange={(e) => onChange(e)}
							required
						/>
					</span>
					<CommonButton
						content='ACTUALIZAR EMPLEADO'
						variant='button-green add-employee-button'
					/>
				</form>
				<CommonButton
					content='CERRAR'
					onClick={props.onCloseClick}
					variant='button-red'
				/>
			</div>
		</div>
	);
};

export default EditEmployee;

import React, { useState } from 'react';

// Load common components

import TableRow from '../common/TableRow';
import EditEmployee from '../layout/EditEmployee';

// Load formatters

import { MXNFormatter, USDFormatter } from '../formatters/currency';
import { textFormatter } from '../formatters/text';

const EmployeesFeed = (props) => {
	const [stateData, setData] = useState({
		currentId: '',
		editUser: false,
	});

	const { editUser, currentId } = stateData;

	const { currency, searchQuery, employees } = props;

	const onClosePopUp = (e) => {
		setData({ ...stateData, editUser: false });
	};
	const onOpenPopUp = (e) => {
		setData({ ...stateData, currentId: e.target.value, editUser: true });
	};

	function setDataFeed(filterCriteria) {
		if (filterCriteria === '' || undefined) {
			return employees.map((employee, index) => {
				return (
					<TableRow
						key={employee._id}
						value={employee._id}
						company={employee.company}
						employee={employee.employee}
						salaryVariant={
							Number(employee.salary) < 10000 ? 'salary-red' : 'salary-green'
						}
						position={employee.position}
						variant={index % 2 === 0 ? 'table-row-gray' : 'table-row-blue'}
						salary={toggleSalaryValue(employee.salary)}
						onEditClick={(e) => onOpenPopUp(e)}
					/>
				);
			});
		} else {
			let formattedCriteria = textFormatter(filterCriteria).toLowerCase();

			return employees.map((employee, index) => {
				if (
					textFormatter(employee.employee)
						.toLowerCase()
						.includes(formattedCriteria) ||
					textFormatter(employee.company)
						.toLowerCase()
						.includes(formattedCriteria)
				) {
					return (
						<TableRow
							key={employee._id}
							company={employee.company}
							employee={employee.employee}
							salaryVariant={
								Number(employee.salary) < 10000 ? 'salary-red' : 'salary-green'
							}
							position={employee.position}
							variant={index % 2 === 0 ? 'table-row-gray' : 'table-row-blue'}
							salary={toggleSalaryValue(employee.salary)}
							onEditClick={(e) => onOpenPopUp(e)}
						/>
					);
				} else {
					return null;
				}
			});
		}
	}

	function toggleSalaryValue(salaryValue) {
		if (currency === 'USD') {
			return USDFormatter.format(Number(salaryValue / 21.5));
		} else if (currency === 'MXN') {
			return MXNFormatter.format(Number(salaryValue));
		}
	}

	return (
		<div>
			<div>
				<table className='table-group'>
					<tbody>
						<tr className='table-heading-row'>
							<th className='table-heading-element'>EMPRESA</th>
							<th className='table-heading-element'>EMPLEADO</th>
							<th className='table-heading-element'>CARGO</th>
							<th className='table-heading-element'>SALARIO</th>
							<th className='table-heading-element'>OPCIONES</th>
						</tr>
						{setDataFeed(searchQuery)}
					</tbody>
				</table>
				{editUser ? (
					<EditEmployee
						employeeId={currentId}
						onCloseClick={(e) => onClosePopUp(e)}
					/>
				) : null}
			</div>
		</div>
	);
};

export default EmployeesFeed;

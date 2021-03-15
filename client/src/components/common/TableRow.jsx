import React from 'react';

// Load common components

import TableButton from './TableButton';

const TableRow = (props) => {
	return (
		<tr className={`table-row ${props.variant}`}>
			<td className='table-element'>{props.company}</td>
			<td className='table-element'>{props.employee}</td>
			<td className='table-element'>{props.position}</td>
			<td className={`table-element salary-element ${props.salaryVariant}`}>
				{props.salary}
			</td>
			<td className='table-element options-element'>
				<TableButton value={props.value} onClick={props.onEditClick} />
			</td>
		</tr>
	);
};

export default TableRow;

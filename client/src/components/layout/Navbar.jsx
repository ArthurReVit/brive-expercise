import React from 'react';

// Load components

import CommonButton from '../common/CommonButton';

const Navbar = (props) => {
	return (
		<header>
			<p className='registered-employees'>
				EMPLEADOS REGISTRADOS: {props.employees}
			</p>
			<nav className='currency-menu'>
				<CommonButton
					content='MXN'
					variant={props.MXNvariant}
					onClick={props.onMXNClick}
				/>
				<CommonButton
					content='USD'
					variant={props.USDvariant}
					onClick={props.onUSDClick}
				/>
			</nav>
		</header>
	);
};

export default Navbar;

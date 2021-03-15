import React, { Component, Fragment } from 'react';
import axios from 'axios';

// Load components

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

// Load styles

import './App.css';

class App extends Component {
	state = {
		employees: [],
		currency: 'MXN',
		searchQuery: '',
	};

	async componentDidMount() {
		try {
			const res = await axios.get('/api/workers');

			this.setState({ employees: res.data });
		} catch (err) {
			console.error(err.response.data);
		}
	}

	handleMXNClick = () => {
		this.setState({ currency: 'MXN' });
	};

	handleUSDClick = () => {
		this.setState({ currency: 'USD' });
	};

	handleSearchChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { employees, currency, searchQuery } = this.state;

		return (
			<Fragment>
				<Navbar
					onMXNClick={this.handleMXNClick}
					onUSDClick={this.handleUSDClick}
					MXNvariant={
						currency === 'MXN' ? 'button-green-active' : 'button-green'
					}
					USDvariant={
						currency === 'USD' ? 'button-green-active' : 'button-green'
					}
					employees={employees.length}
				/>
				{employees === [] || undefined ? (
					<p>Cargando datos...</p>
				) : (
					<Landing
						employees={employees}
						currency={currency}
						name='searchQuery'
						value={searchQuery}
						onChange={this.handleSearchChange}
						searchQuery={searchQuery}
					/>
				)}
				<Footer />
			</Fragment>
		);
	}
}

export default App;

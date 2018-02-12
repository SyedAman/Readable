import React, { Component } from 'react';

import NavBar from '../components/NavBar';
import Home from './Home';

class App extends Component {
	render() {
		return (
			<div>
				<table className="readable">
					<tbody className="readable-content">
						<NavBar />
						<tr style={{ height: '10px' }} className="spacer" />
						<Home />
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
const App = () => {
	return (
		<Router>
			<div className='container '>
				<Navbar />
				<Switch>
					<Route path='/' exact>
						<Home />
					</Route>
					<Route path='/'>
						<Auth />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;

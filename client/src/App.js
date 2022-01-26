import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
import Modal from './components/Modal';
import PostDetails from './components/PostDetails/PostDetails';
import MyProfile from './components/MyProfile';
const App = () => {
	// const user = JSON.parse(localStorage.getItem('profile'));
	// console.log(user);
	const { isError, errorMessage } = useSelector((state) => state.posts);
	return (
		<Router>
			<div className='container-fluid'>
				{isError && <Modal content={errorMessage} />}
				<Navbar />
				<Switch>
					<Route path='/' exact component={() => <Redirect to='/posts' />} />
					<Route path='/posts' exact>
						<Home />
					</Route>
					<Route path='/posts/search' exact>
						<Home />
					</Route>
					<Route path='/posts/:id'>
						<PostDetails />
					</Route>
					<Route
						path='/auth'
						exact
						component={() =>
							!JSON.parse(localStorage.getItem('profile')) ? <Auth /> : <Redirect to='/posts' />}
					/>
					<Route path='/user/:id' component={() => <MyProfile />} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;

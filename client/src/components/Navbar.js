import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaImages, FaUserAlt } from 'react-icons/fa';
import { useHistory, Link, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
const Navbar = () => {
	const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const logout = () => {
		dispatch({ type: 'LOGOUT' });
		history.push('/');
		setUser(null);
	};
	useEffect(
		() => {
			const token = user && user.token;
			if (token) {
				const decodedToken = decode(token);
				if (decodedToken.exp * 1000 < new Date().getTime()) {
					logout();
				}
			}
			setUser(JSON.parse(localStorage.getItem('profile')));
		},
		[ location, setUser ]
	);
	return (
		<nav className='navbar navbar-light background-light'>
			<div className='container-fluid d-flex flex-column flex-sm-row '>
				<h1 className='h1 my-auto mx-auto mx-sm-0' onClick={() => history.push('/')}>
					Memories <FaImages className='mb-2' />
				</h1>
				{user ? (
					<div className='me-2 d-flex align-items-center justify-content-between'>
						{user.result.imageUrl ? (
							<img
								src={user.result.imageUrl}
								className='rounded-circle'
								alt=' kadm'
								width='40px'
								height='40px'
							/>
						) : (
							<FaUserAlt />
						)}
						<p className='my-auto mx-2'>{user.result.name}</p>
						<button className='btn accent btn-sm' onClick={() => logout()}>
							Sign Out
						</button>
					</div>
				) : (
					<Link className='btn btn-sm accent me-0' to='/auth'>
						Sign In
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;

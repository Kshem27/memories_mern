import React, { useEffect, useState } from 'react';
import Form from './Form';
import Posts from './Posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts';
const Home = () => {
	const [ currentId, setCurrentId ] = useState(null);
	const dispatch = useDispatch();
	useEffect(
		() => {
			dispatch(getPosts());
		},
		[ dispatch ]
	);
	return (
		<div className='row'>
			<div className='col-lg-8 order-1 order-lg-0'>
				<Posts setCurrentId={setCurrentId} />
			</div>
			<div className='col-lg-4 mt-5 order-0 order-lg-1'>
				<Form currentId={currentId} setCurrentId={setCurrentId} />
			</div>
		</div>
	);
};

export default Home;

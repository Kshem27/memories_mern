import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from './components/Form';
import Posts from './components/Posts';
import { getPosts } from './actions/posts';

const App = () => {
	const [ currentId, setCurrentId ] = useState(null);
	const dispatch = useDispatch();
	useEffect(
		() => {
			dispatch(getPosts());
		},
		[ dispatch ]
	);
	return (
		<div className='container '>
			<h1 style={{ textAlign: 'center' }}>Memories Project</h1>
			<div className='row'>
				<div className='col-lg-8 order-1 order-lg-0'>
					<Posts setCurrentId={setCurrentId} />
				</div>
				<div className='col-lg-4 mt-5 order-0 order-lg-1'>
					<Form currentId={currentId} setCurrentId={setCurrentId} />
				</div>
			</div>
		</div>
	);
};

export default App;

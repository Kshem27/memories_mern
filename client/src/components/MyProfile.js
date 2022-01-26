import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByUser } from '../actions/posts';
import { useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import Loading from './Loading';
const MyProfile = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const [ val, setVal ] = useState('');
	const { posts } = useSelector((state) => state.posts);
	let likes = 0;
	posts && posts.forEach((post) => (likes = likes + post.likes.length));
	const user = JSON.parse(localStorage.getItem('profile'));
	const token = user && user.token;
	// console.log(posts);
	const openPost = (id) => {
		history.push(`/posts/${id}`);
	};
	// const id = (user && user.result && user.result.googleId) || (user && user.result && user.id);
	// dispatch(fetchPostsByUser(id));
	// useEffect(
	// 	() => {

	// 		setVal(1);
	// 	},
	// 	[ user ]
	// );

	// useEffect(
	// 	() => {
	// 		// const token = user && user.token;
	// 		const id = (user && user.result && user.result.googleId) || (user && user.result && user.id);
	// 		dispatch(fetchPostsByUser(id));
	// 	},
	// 	[ dispatch, user ]
	// );
	return (
		<div className='container myProfile'>
			{user && user.result && user.result.imageUrl ? (
				<img src={user.result.imageUrl} alt='Profile Pic' className='rounded mb-3' />
			) : (
				<img
					src='https://www.floresdevida.org/wp-content/uploads/2018/06/default-user-thumbnail-1.png'
					alt='dp'
				/>
			)}
			<h3>{user.result.name}</h3>
			<div className='row'>
				<div className='col-6'>
					<h3>
						Number Of Posts:<br /> {posts && posts.length}
					</h3>
				</div>
				<div className='col-6'>
					<h3>
						Total Likes: <br />
						{likes}
					</h3>
				</div>
			</div>
			<h1 className='my-3'>{posts.length !== 0 && 'Posts'}</h1>
			{posts ? (
				posts.map(({ name, title, message, likes, _id, selectedFile }) => (
					<div
						style={{ cursor: 'pointer' }}
						onClick={() => openPost(_id)}
						key={_id}
						className='card-recommended p-2 row '
					>
						{/* <div className='card-recommend p-1'> */}
						<div className='col-md-3'>
							<img className='float-right img-thumbnail' src={selectedFile} alt='hello' />
						</div>
						<div className='col-md-9 mb-3'>
							<h4>{title}</h4>
							<p className='text-muted'>{message}</p>
							<p className='text-muted'>Likes:{likes.length}</p>
						</div>
						{/* </div> */}
						<hr className='my-3' />
					</div>
				))
			) : (
				<Loading />
			)}
		</div>
	);
};

export default MyProfile;

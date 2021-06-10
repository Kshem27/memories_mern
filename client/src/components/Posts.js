import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';

const Posts = ({ setCurrentId }) => {
	const posts = useSelector((state) => state.posts);
	console.log(posts);
	return !posts.length ? (
		<h1>LOADING......</h1>
	) : (
		<div className='container d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-lg-start justify-content-center mb-5'>
			{posts.map((post) => {
				return <Post key={post._id} post={post} setCurrentId={setCurrentId} />;
			})}
		</div>
	);
};

export default Posts;

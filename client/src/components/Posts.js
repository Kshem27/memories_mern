import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';
import Loading from './Loading';
// import Modal from './Modal';

const Posts = ({ setCurrentId }) => {
	const { posts, isLoading } = useSelector((state) => state.posts);
	// console.log(posts);
	if (posts && !posts.length && !isLoading)
		return <h1 style={{ textAlign: 'center', color: 'white' }}>No Posts Found</h1>;
	return isLoading ? (
		<Loading />
	) : (
		// <div className='d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-md-evenly justify-content-center'>
		<div className='row row-cols-2 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4'>
			{/* <Modal /> */}
			{posts &&
				posts.map((post) => {
					return <Post key={post._id} post={post} setCurrentId={setCurrentId} />;
				})}
		</div>
	);
};

export default Posts;

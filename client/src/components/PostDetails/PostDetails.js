import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getPost, getPostBySearch } from '../../actions/posts';
import Loading from '../Loading';
const PostDetails = () => {
	const { post, posts, isLoading } = useSelector((state) => state.posts);
	// console.log(post);
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	// a and b are javascript Date objects
	const openPost = (_id) => {
		history.push(`/posts/${_id}`);
	};
	useEffect(
		() => {
			dispatch(getPost(id));
		},
		[ id, dispatch ]
	);
	useEffect(
		() => {
			if (post) {
				dispatch(getPostBySearch({ search: 'none', tags: post && post.tags.join(',') }));
			}
		},
		[ post, dispatch ]
	);
	if (isLoading) return <Loading />;
	if (!post) return <h1>Hello</h1>;
	const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
	// console.log(recommendedPosts);
	return (
		<div className='container-fluid'>
			<button className='btn accent' onClick={() => history.goBack()}>
				<FaArrowLeft />
			</button>
			<div className='container post-container d-flex flex-column flex-lg-row justify-content-around align-items-center'>
				<div className='info p-3 order-1 order-lg-0'>
					<h1>{post.title}</h1>
					<small className='text-muted'>{post.tags.map((tag) => `#${tag} `)}</small>
					<p>{post.message}</p>
					<h4 className='mt-5'>Created By: {post.name}</h4>
					<small className='text-muted'>Created 19 Hours ago</small>
					<hr />
					<strong>Real Time Chat Coming Soon !!</strong>
					<hr />
					<strong>Comments Coming Soon !!</strong>
					<hr />
				</div>
				<div className='post-img order-0 order-lg-1'>
					<img src={post.selectedFile} alt='...' className='img-post' />
				</div>
			</div>
			{recommendedPosts.length !== 0 && (
				<div className='container recommended'>
					<h2>You might also Like</h2>
					<hr />
					<div className={`row row-cols-2 row-cols-md-4 p-2`}>
						{recommendedPosts.map(({ name, title, message, likes, _id, selectedFile }) => (
							<div style={{ cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id} className='col'>
								<div className='card h-100 p-1'>
									<img src={selectedFile} className='recommended-img card-img-top' alt='hello' />

									<h4>{title}</h4>
									<p className='text-muted'>{message}</p>
									<p className='text-muted'>Likes:{likes.length}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default PostDetails;

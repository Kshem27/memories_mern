import React, { useState } from 'react';
import { FaEdit, FaThumbsUp, FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../actions/posts';
import { useHistory } from 'react-router-dom';
const Post = ({ post, setCurrentId }) => {
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));
	const history = useHistory();
	const handleDelete = () => {
		dispatch(deletePost(post._id));
	};
	const handleLike = () => {
		dispatch(likePost(post._id));
	};
	const openPost = () => {
		history.push(`/posts/${post._id}`);
	};
	const { title, creator, message, selectedFile, tags, name, likes } = post;
	const [ like, setLike ] = useState(post && post.likes);
	const Likes = () => {
		if (likes.length > 0) {
			return likes.find(
				(like) =>
					like === ((user && user.result && user.result.googleId) || (user && user.result && user.result._id))
			) ? (
				<button
					className='btn btn-sm card-link like d-flex align-items-center stretched-link'
					onClick={handleLike}
					disabled={!(user && user.result)}
				>
					<FaThumbsUp />
					&nbsp;{likes.length > 2 ? (
						`You and ${likes.length - 1} others`
					) : (
						`${likes.length} like${likes.length > 1 ? 's' : ''}`
					)}
				</button>
			) : (
				<button
					className='btn btn-sm card-link like d-flex align-items-center stretched-link'
					onClick={handleLike}
					disabled={!(user && user.result)}
				>
					<FaThumbsUp />&nbsp;
					{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
				</button>
			);
		}
		return (
			<button
				className='btn btn-sm card-link like d-flex align-items-center stretched-link'
				onClick={handleLike}
				disabled={!(user && user.result)}
			>
				<FaThumbsUp />&nbsp;Like
			</button>
		);
	};
	return (
		<div className='col mb-2'>
			<div className='card h-100'>
				<img src={selectedFile} className='card-img' alt='...' />
				{/* {((user && user.result && user.result.googleId) === creator ||
					(user && user.result && user.result._id) === creator) && (
					<button
						className='btn editButton card-link stretched-link'
						style={{ color: '#4DA8DA' }}
						onClick={() => {
							setCurrentId(post._id);
						}}
					>
						<FaEdit />
					</button>
				)} */}
				<div className='card-body'>
					<h5 className='card-title title'>{name}</h5>
					<p className='card-subtitle mb-3 text-muted'>{tags.map((tag) => `#${tag} `)}</p>
					<h6 className='card-subtitle mb-4 '>{title}</h6>
					<p className='card-subtitle mb-1 text-muted'>{message}</p>
					<button className='btn stretched-link' onClick={openPost} />
				</div>
				<div className='d-flex justify-content-between cardFooter'>
					<Likes />
					{((user && user.result && user.result.googleId) === creator ||
						(user && user.result && user.result._id) === creator) && (
						<button
							className='btn btn-lg card-link stretched-link'
							style={{ color: '#4DA8DA' }}
							onClick={() => {
								setCurrentId(post._id);
							}}
						>
							<FaEdit />
						</button>
					)}
					{((user && user.result && user.result.googleId) === creator ||
						(user && user.result && user.result._id) === creator) && (
						<button
							className='btn btn-sm card-link delete float-end stretched-link'
							onClick={(e) => handleDelete(e)}
						>
							<FaRegTrashAlt />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Post;

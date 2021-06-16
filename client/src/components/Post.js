import React from 'react';
import { FaEdit, FaThumbsUp } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../actions/posts';
const Post = ({ post, setCurrentId }) => {
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));
	const handleDelete = () => {
		dispatch(deletePost(post._id));
	};
	const { title, creator, message, selectedFile, tags, name, likes } = post;
	const Likes = () => {
		if (likes.length > 0) {
			return likes.find(
				(like) =>
					like === ((user && user.result && user.result.googleId) || (user && user.result && user.result._id))
			) ? (
				<React.Fragment className='d-flex align-items-center'>
					<FaThumbsUp />
					&nbsp;{likes.length > 2 ? (
						`You and ${likes.length - 1} others`
					) : (
						`${likes.length} like${likes.length > 1 ? 's' : ''}`
					)}
				</React.Fragment>
			) : (
				<React.Fragment>
					<FaThumbsUp />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				<FaThumbsUp /> Like
			</React.Fragment>
		);
	};
	return (
		<div className='card me-3 mt-3'>
			<img src={selectedFile} className='card-img-top' alt='...' />
			<div className='card-body'>
				{((user && user.result && user.result.googleId) === creator ||
					(user && user.result && user.result._id) === creator) && (
					<button
						className='btn editButton '
						style={{ color: '#4DA8DA' }}
						onClick={() => {
							setCurrentId(post._id);
						}}
					>
						<FaEdit />
					</button>
				)}
				<h4 className='card-title title'>{title}</h4>
				<h6 className='card-subtitle mb-2 '>{name}</h6>
				<h6 className='card-subtitle mb-2 text-muted'>{tags.map((tag) => `#${tag} `)}</h6>
				<p className='card-title'>{message}</p>
				<button
					className='btn btn-sm primary'
					onClick={() => {
						dispatch(likePost(post._id));
					}}
					disabled={!(user && user.result)}
				>
					<Likes />
				</button>
				{((user && user.result && user.result.googleId) === creator ||
					(user && user.result && user.result._id) === creator) && (
					<button className='btn accent btn-sm float-end' onClick={(e) => handleDelete(e)}>
						Delete
					</button>
				)}
			</div>
		</div>
	);
};

export default Post;

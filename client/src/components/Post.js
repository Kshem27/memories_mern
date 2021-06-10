import React from 'react';
import { FaEdit, FaThumbsUp } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../actions/posts';
const Post = ({ post, setCurrentId }) => {
	const dispatch = useDispatch();
	const handleDelete = () => {
		dispatch(deletePost(post._id));
	};
	const { title, creator, createdAt, message, selectedFile, tags, likeCount } = post;
	return (
		<div className='card me-3 mt-3'>
			<img src={selectedFile} className='card-img-top' alt='...' />
			<div className='card-body'>
				<button
					className='btn editButton'
					onClick={() => {
						setCurrentId(post._id);
					}}
				>
					<FaEdit />
				</button>
				<h4 className='card-title title'>{title}</h4>
				<h6 className='card-subtitle mb-2 text-muted'>{creator}</h6>
				<h6 className='card-subtitle mb-2 text-muted'>Tags :{tags.map((tag) => `${tag}, `)}</h6>
				<h6 className='card-subtitle mb-2 text-muted'>{`${new Date(createdAt).getDate()}/${new Date(
					createdAt
				).getMonth()}/${new Date(createdAt).getFullYear()}`}</h6>
				<p className='card-text'>{message}</p>
				<button className='btn btn-danger' onClick={(e) => handleDelete(e)}>
					Delete
				</button>
				<button
					className='btn btn-primary'
					onClick={() => {
						dispatch(likePost(post._id));
					}}
				>
					<FaThumbsUp /> {likeCount}
				</button>
			</div>
		</div>
	);
};

export default Post;

import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';
const CommentSection = ({ post }) => {
	const dispatch = useDispatch();
	const [ comments, setComments ] = useState(post && post.comments);
	const [ comment, setComment ] = useState('');
	const commentRef = useRef();
	const user = JSON.parse(localStorage.getItem('profile'));
	const handleClick = async () => {
		console.log('clacnak');
		const finalComment = `${user.result.name}: ${comment}`;
		const newComments = await dispatch(commentPost(finalComment, post._id));
		setComments(newComments);
		setComment('');
		commentRef.current.scrollIntoView({ behaviour: 'smooth' });
	};
	// console.log(post);
	return (
		<div className='container-fluid'>
			<div className='row row-cols-1 row-cols-lg-2 '>
				<div className='col-lg-4 comments overflow-auto'>
					<h4>Comments</h4>
					<hr />
					{comments && comments.length == 0 && <p>No Comments Yet</p>}
					{comments.map((c, i) => (
						<p key={i}>
							<strong>{c.split(':')[0]}</strong>
							:{c.split(':')[1]}
						</p>
					))}
					<div ref={commentRef} />
				</div>
				{user &&
				user.result &&
				user.result.name && (
					<div className='col-lg-8'>
						<h4>Write a Comment</h4>
						<textarea
							className='form-control'
							placeholder='Comment'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<button className='btn primary my-2' onClick={handleClick} style={{ width: '100%' }}>
							Submit
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentSection;

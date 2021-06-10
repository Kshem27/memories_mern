import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createPost, updatePost } from '../actions/posts';
import FileBase from 'react-file-base64';
const Form = ({ currentId, setCurrentId }) => {
	const dispatch = useDispatch();
	const [ postData, setPostData ] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
	const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id === currentId) : null));
	const handleChange = (e) => {
		setPostData({ ...postData, [e.target.name]: e.target.value });
	};
	const clear = () => {
		setCurrentId(null);
		setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentId) {
			dispatch(updatePost(currentId, postData));
		} else {
			dispatch(createPost(postData));
		}
		clear();
	};
	useEffect(
		() => {
			if (post) setPostData(post);
		},
		[ post ]
	);
	return (
		<div className='container'>
			<h1>{currentId ? `Editing` : `Creating`} a Memory</h1>
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<input
						type='text'
						name='creator'
						placeholder='Creator'
						className='form-control'
						value={postData.creator}
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>
				<div className='mb-3'>
					<input
						type='text'
						name='title'
						placeholder='Title'
						className='form-control'
						value={postData.title}
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>
				<div className='mb-3'>
					<input
						type='text'
						name='tags'
						placeholder='Tags (coma separated)'
						className='form-control'
						value={postData.tags}
						onChange={(e) => {
							setPostData({ ...postData, tags: e.target.value.split(',') });
							console.log(postData);
						}}
					/>
				</div>
				<div className='mb-3'>
					<input
						name='message'
						placeholder='Message'
						type='text'
						className='form-control'
						value={postData.message}
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>
				<FileBase
					type='file'
					multiple={false}
					onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
				/>
				<button className='btn btn-success ' type='submit'>
					SUBMIT
				</button>
				<button className='btn btn-danger' onClick={clear}>
					Clear
				</button>
			</form>
		</div>
	);
};

export default Form;

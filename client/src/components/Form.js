import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createPost, updatePost } from '../actions/posts';
import FileBase from 'react-file-base64';
const Form = ({ currentId, setCurrentId }) => {
	const dispatch = useDispatch();
	const [ postData, setPostData ] = useState({ title: '', message: '', tags: '', selectedFile: '' });
	const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id === currentId) : null));
	const user = JSON.parse(localStorage.getItem('profile'));
	const handleChange = (e) => {
		setPostData({ ...postData, [e.target.name]: e.target.value });
	};
	const clear = () => {
		setCurrentId(null);
		setPostData({ title: '', message: '', tags: '', selectedFile: '' });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentId) {
			dispatch(updatePost(currentId, { ...postData, name: user && user.result && user.result.name }));
		} else {
			dispatch(createPost({ ...postData, name: user && user.result && user.result.name }));
		}
		clear();
	};
	useEffect(
		() => {
			if (post) setPostData(post);
		},
		[ post ]
	);
	if (!(user && user.result && user.result.name)) {
		return (
			<div className='container form'>
				<h1>Please Sign in to create your own memories and like other's memories</h1>
			</div>
		);
	}
	return (
		<div className='container form'>
			<h4 className='text-center'>{currentId ? `Editing` : `Creating`} a Memory</h4>
			<form onSubmit={handleSubmit}>
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
				<div className='mt-3 d-block mx-auto'>
					<button className='btn primary d-block formButton' type='submit'>
						SUBMIT
					</button>
					<button className='btn accent d-block formButton mt-2' onClick={clear}>
						Clear
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;

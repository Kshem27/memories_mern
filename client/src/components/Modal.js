import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { END_ERROR } from '../constants/actionTypes';
const Modal = ({ content }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const closeModal = () => {
		dispatch({ type: END_ERROR });
	};
	useEffect(() => {
		let showError = setTimeout(() => {
			closeModal();
			// history.push('/');
		}, 3000);
		return () => {
			clearTimeout(showError);
		};
	});
	return (
		<div className='modal-container'>
			<div className='modal-content'>
				{content}
				<button className='btn text-danger' onClick={closeModal}>
					X
				</button>
			</div>
		</div>
	);
};

export default Modal;

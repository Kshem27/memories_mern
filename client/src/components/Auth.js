import React, { useState } from 'react';
import { FaLock, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { signin, signup } from '../actions/auth';
const Auth = () => {
	const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
	const [ isSignUp, setIsSignUp ] = useState(false); //is it sign up page or not
	const [ formData, setFormData ] = useState(initialState);
	const [ showPassword, setShowPassword ] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const googleSuccess = async (res) => {
		const result = res && res.profileObj;
		const token = res && res.tokenId;
		try {
			dispatch({ type: 'AUTH', data: { result, token } });
			history.push('/');
		} catch (error) {
			console.log(error);
		}
		// console.log(res);
	};
	const googleFailure = (error) => {
		console.log(error);
		console.log('failed');
	};
	const handleChange = (e) => {
		setFormData((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};
	const switchMode = () => {
		setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
		setIsSignUp((prevState) => !prevState);
		setShowPassword(false);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(formData);
		if (isSignUp) {
			//error handling
			dispatch(signup(formData, history));
		} else {
			dispatch(signin(formData, history));
		}
	};
	return (
		<div className='container d-flex flex-column justify-content-center align-items-center signContainer form'>
			<FaLock className='h3' />
			<h4>{isSignUp ? 'Sign Up' : 'Sign In'}</h4>
			<form className=' py-2 px-3 signupform' onSubmit={handleSubmit}>
				{isSignUp && (
					<div className='d-flex justify-content-between'>
						<div className='mb-2'>
							<label htmlFor='firstName' className='form-label'>
								First Name
							</label>
							<input
								type='text'
								className='form-control'
								id='firstName'
								name='firstName'
								placeholder='First Name'
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className='mb-2'>
							<label htmlFor='lastName' className='form-label'>
								Last Name
							</label>
							<input
								type='text'
								className='form-control'
								id='lastName'
								name='lastName'
								placeholder='Last Name'
								onChange={(e) => handleChange(e)}
							/>
						</div>
					</div>
				)}
				<React.Fragment>
					<div className='mb-2'>
						<label htmlFor='email' className='form-label'>
							Email
						</label>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							placeholder='Email'
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className='mb-2'>
						<label htmlFor='password' className='form-label'>
							Password
						</label>
						<div className='input d-flex'>
							<input
								type={showPassword ? 'text' : 'password'}
								className='form-control'
								id='password'
								name='password'
								placeholder='Password'
								onChange={(e) => handleChange(e)}
							/>
							<button
								className='btn btn-outline-light'
								type='button'
								onClick={() => setShowPassword((prev) => !prev)}
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
					</div>
				</React.Fragment>
				{isSignUp && (
					<React.Fragment>
						<div className='mb-2'>
							<label htmlFor='repeatPassword' className='form-label'>
								Repeat Password
							</label>
							<input
								type='password'
								className='form-control'
								id='repeatPassword'
								name='confirmPassword'
								placeholder='Repeat Password'
								onChange={(e) => handleChange(e)}
							/>
						</div>
					</React.Fragment>
				)}
				<button type='submit' className='btn accent d-block mb-3 mx-auto '>
					{isSignUp ? 'Sign Up' : 'Sign In'}
				</button>
				<GoogleLogin
					clientId='475601058361-3dk3u8q0g9d174vjeqt0n6i049ku066l.apps.googleusercontent.com'
					render={(renderProps) => {
						return (
							<button
								className='btn btn-warning d-flex align-items-center mx-auto mb-3 float-start'
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								variant='contained'
							>
								<FaGoogle />&nbsp; Google Sign In
							</button>
						);
					}}
					onSuccess={googleSuccess}
					onFailure={googleFailure}
					cookiePolicy={'single_host_origin'}
				/>
				<button type='button' className='btn btn-info d-block float-end' onClick={() => switchMode()}>
					{isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
				</button>
			</form>
		</div>
	);
};

export default Auth;

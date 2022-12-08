import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import './LoginPage.scss';
import Button from '../../components/Button';
import { authActionCreators } from '../../redux/actions/authActionCreators';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { errorAuthSelector, isLoadingAuthSelector, isAuthAuthSelector } from '../../redux/selectors/authSelectors';
import Loading from '../../components/Loading';
import { CHECK_EMAIL, EMPTY_EMAIL, EMPTY_PASSWORD, INCORRECT_EMAIL } from '../../constants';

const initialLoginForm = { email: '', password: '' };

const LoginPage = () => {
	const [loginForm, setLoginForm] = useState(initialLoginForm);
	const [emailDirty, setEmailDirty] = useState(false);
	const [passwordDirty, setPasswordDirty] = useState(false);
	const [emailError, setEmailError] = useState(EMPTY_EMAIL);
	const [passwordError, setPasswordError] = useState(EMPTY_PASSWORD);
	const [formValid, setFormValid] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const errorMessage = useAppSelector(errorAuthSelector);
	const isLoading = useAppSelector(isLoadingAuthSelector);
	const isAuth = useAppSelector(isAuthAuthSelector);

	useEffect(() => {
		if (isAuth) {
			navigate('/main', { replace: true });
		}
	}, [isAuth, navigate]);

	const onLoginFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {		
		setLoginForm(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
		
		switch (e.target.name) {
			case 'email':				
				if (!CHECK_EMAIL.test(String(e.target.value).toLowerCase())) {
					setEmailError(INCORRECT_EMAIL);

					if (!e.target.value) {
						setEmailError(EMPTY_EMAIL);
					};
				} else {
					setEmailError('');
				}
				break
			case 'password':
				if (e.target.value.length <= 8) {
					setPasswordError('Password должен содержать не менее 8 символов');

					if (!e.target.value) {
						setPasswordError('Password не может быть пустым');
					};
				} else {
					setPasswordError('');
				}
				break
		}
	}, [loginForm.email, loginForm.password]);

	const onLoginFormSubmit = useCallback(() =>
		dispatch(authActionCreators.getLogin({ email: loginForm.email, password: loginForm.password })),
		[dispatch, loginForm.email, loginForm.password]
	);

	const blurHundler = (e: React.ChangeEvent<HTMLInputElement>) => {
		switch (e.target.name) {
			case 'email':
				setEmailDirty(true)
				break
			case 'password':
				setPasswordDirty(true)
				break
		}
	};

	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false);
		} else {
			setFormValid(true);
		}
	}, [emailError, passwordError]);

	return (
		<>
			<div className='login'>
				<div className='login-container'>
					<div className='login-container-title'>
						<h1>Sign In</h1>
					</div>
					<div className='login-container-wrapper'>
						{errorMessage && <div className='login-container-wrapper-error'><p>{errorMessage}</p></div>}
						{!isLoading ? (
							<>
								<div className='login-container-wrapper-email'>									
									<div className='login-container-wrapper-email-title'>
										<p className='b1'>Email</p>
									</div>
									{emailError && emailDirty ? (
										<div className='login-container-wrapper-email-input-error'>
											<Input onBlur={e => blurHundler(e)} name='email' className='c2-p' placeholder='Your email' autoFocus onChange={onLoginFormChange} fieldName='email' value={loginForm.email} />
										</div>
									) : (
										<div className='login-container-wrapper-email-input'>
											<Input onBlur={e => blurHundler(e)} name='email' className='c2-p' placeholder='Your email' autoFocus onChange={onLoginFormChange} fieldName='email' value={loginForm.email} />
										</div>
									)}
									{(emailDirty && emailError) && <div className='login-container-wrapper-email-error'>{emailError}</div>}
								</div>
								<div className='login-container-wrapper-password'>
									<div className='login-container-wrapper-password-title'>
										<p className='b1'>Password</p>
									</div>
									{passwordError && passwordDirty ? (
										<div className='login-container-wrapper-password-input-error'>
											<Input type='password' onBlur={e => blurHundler(e)} name='password' className='c2-p' placeholder='Your password' onChange={onLoginFormChange} fieldName='password' value={loginForm.password} />
										</div>										
									) : (
										<div className='login-container-wrapper-password-input'>
											<Input type='password' onBlur={e => blurHundler(e)} name='password' className='c2-p' placeholder='Your password' onChange={onLoginFormChange} fieldName='password' value={loginForm.password} />
										</div>
									)}									
									{(passwordDirty && passwordError) && <div className='login-container-wrapper-password-error'>{passwordError}</div>}
									<div className='login-container-wrapper-password-text'>
										<p className='c2-p'>Forgot password?</p>
									</div>
								</div>
								<div className='login-container-wrapper-button'>
									{!formValid ? (
										<Button disabled={!formValid} className='button-disabled' type='button' text='Sign in' onClick={onLoginFormSubmit} />
									) : (
										<Button disabled={!formValid} type='button' text='Sign in' onClick={onLoginFormSubmit} />
									)}
									
								</div>
								<div className='login-container-wrapper-sing-up'>
									<span className='sing-up-text'>Don't have an account?</span>
									<Link to='/registration' >
										<span className='sing-up-link'>Sing Up</span>
									</Link>
								</div>
							</>
						) : (<Loading />)}						
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
import React, { useState, useCallback, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { registration } from '../../services/authServices';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import './RegistrationPage.scss';
import { CHECK_EMAIL, CHECK_NAME, EMPTY_EMAIL, EMPTY_PASSWORD, EMPTY_USERNAME, INCORRECT_EMAIL, INCORRECT_PASSWORD, INCORRECT_USERNAME } from '../../constants';

const initialRegistrationForm = { username: '', email: '', password: '' };

const RegistrationPage = () => {
   const [registrationForm, setRegistrationForm] = useState(initialRegistrationForm);
   const [isRegistered, setIsRegistered] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [userNameValid, setUserNameValid] = useState(false);
	const [userNameError, setUserNameError] = useState(EMPTY_USERNAME);
	const [emailValid, setEmailValid] = useState(false);
	const [emailError, setEmailError] = useState(EMPTY_EMAIL);
	const [passwordValid, setPasswordValid] = useState(false);
	const [passwordError, setPasswordError] = useState(EMPTY_PASSWORD);
	const [formValid, setFormValid] = useState(false);

   const onRegistrationFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setRegistrationForm( prevState => ({ ...prevState, [e.target.id]: e.target.value }));
		switch (e.target.name) {
			case 'user':
				if (!CHECK_NAME.test(String(e.target.value))) {
					setUserNameError(INCORRECT_USERNAME);
					if (!e.target.value) {
						setUserNameError(EMPTY_USERNAME);
					} else {
						setUserNameError('');
					}
				}
				break;
			case 'email':
				if (!CHECK_EMAIL.test(String(e.target.value))) {
					setEmailError(INCORRECT_EMAIL);
					if (!e.target.value) {
						setEmailError(EMPTY_EMAIL);
					}
				} else {
					setEmailError('');
				}
				break;
			case 'password':
				if (e.target.value.length <= 8) {
					setPasswordError(INCORRECT_PASSWORD);
					if (!e.target.value) {
						setPasswordError(EMPTY_PASSWORD);
					}
				} else {
					setPasswordError('');
				}
				break;
		}
	}, [registrationForm.username, registrationForm.email, registrationForm.password]);

	const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		switch (e.target.name) {
			case 'user':
				setUserNameValid(true);
				break;
			case 'email':
				setEmailValid(true);
				break;
			case 'password':
				setPasswordValid(true);
				break;
		}
	};

	useEffect(() => {
		if (emailError || passwordError || userNameError) {
			setFormValid(false);
		} else {
			setFormValid(true);
		}
	}, [emailError, passwordError, userNameError]);

   const onRegistrationFormSubmit = useCallback( async (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();

			try {
				setIsLoading(true);
				const response = await registration({
					username: registrationForm.username,
					email: registrationForm.email,
					password: registrationForm.password,
				});

				if (response.data) {
					setIsRegistered(true);
					setRegistrationForm(initialRegistrationForm)
				}
			} catch (e: any) {
				const [errorValue] = Object.values(e?.response?.data).flat();
				setErrorMessage(errorValue as string);
			} finally {
				setIsLoading(false);
			}
	}, [registrationForm]);

	return (
		<>
			{
				isRegistered ? (
					<div className='error-items'>
						<div className='error-items-container'>
							<div className='error-items-container-wrap'>
								<h2>Please check email to verify your account!</h2>
								<Link to='/login'>
									<Button text='Go to the login page' />
								</Link>
							</div>
						</div>
					</div>
				) : (
					<>
						<div className='registration'>
							<div className='registration-container'>
								<div className='registration-container-title'>
									<h1>Sign Up</h1>
								</div>
								<div className='registration-container-wrapper'>
									{errorMessage && <div className='registration-container-wrapper-error'><p>{errorMessage}</p></div>}
									{!isLoading ? (
										<>
											<div className='registration-container-wrapper-username'>					
												<div className='registration-container-wrapper-username-title'>
													<p className='b1'>Username</p>
												</div>
												{userNameError && userNameValid ? (
													<div className='registration-container-wrapper-username-input-error'>
														<Input
															name='user'
															onBlur={blurHandler}
															placeholder='Your username'
															autoFocus
															className='c2-p'
															onChange={onRegistrationFormChange}
															fieldName='username'
															value={registrationForm.username}
														/>													
													</div>	
												) : (
													<div className='registration-container-wrapper-username-input'>
														<Input
															name='user'
															onBlur={blurHandler}
															placeholder='Your username'
															autoFocus
															className='c2-p'
															onChange={onRegistrationFormChange}
															fieldName='username'
															value={registrationForm.username}
														/>													
													</div>			
												)}
												{(userNameValid && userNameError) && <div className='registration-container-wrapper-username-error'>{userNameError}</div>}
											</div>	
											<div className='registration-container-wrapper-email'>						
												<div className='registration-container-wrapper-email-title'>
													<p className='b1'>Email</p>
												</div>
													{emailError && emailValid ? (
														<div className='registration-container-wrapper-email-input-error'>
															<Input
																name='email'
																onBlur={blurHandler}
																className='c2-p'
																placeholder='Your email'
																onChange={onRegistrationFormChange}
																fieldName='email'
																value={registrationForm.email}
															/>													
													</div>
													) : (
														<div className='registration-container-wrapper-email-input'>
															<Input
																name='email'
																onBlur={blurHandler}
																className='c2-p'
																placeholder='Your email'
																onChange={onRegistrationFormChange}
																fieldName='email'
																value={registrationForm.email}
															/>													
														</div>
													)}
												{(emailValid && emailError) && <div className='registration-container-wrapper-email-error'>{emailError}</div>}
											</div>
											<div className='registration-container-wrapper-password'>
												<div className='registration-container-wrapper-password-title'>
													<p className='b1'>Password</p>
												</div>
													{passwordError && passwordValid ? (
														<div className='registration-container-wrapper-password-input-error'>
															<Input
																name='password'
																type='password'
																onBlur={blurHandler}
																onChange={onRegistrationFormChange}
																fieldName='password'
																value={registrationForm.password}
																className='c2-p'
																placeholder='Your password'
															/>
														</div>
													) : (
														<div className='registration-container-wrapper-password-input'>
															<Input
																name='password'
																type='password'
																onBlur={blurHandler}
																onChange={onRegistrationFormChange}
																fieldName='password'
																value={registrationForm.password}
																className='c2-p'
																placeholder='Your password'
															/>
														</div>
													)}												
												{(passwordValid && passwordError) && <div className='registration-container-wrapper-email-error'>{passwordError}</div>}
												<div className='registration-container-wrapper-password-text'>
													<p className='c2-p'>Forgot password?</p>
												</div>
											</div>
												<div className='registration-container-wrapper-button'>
													{!formValid ? (
														<Button
															disabled={!formValid}
															className='registration-container-wrapper-button-disabled'
															type='button'
															text='Sign up'
															onClick={onRegistrationFormSubmit}
														/>
													) : (
														<Button
															disabled={!formValid}
															className='registration-container-wrapper-button-active'	
															type='button'
															text='Sign up'
															onClick={onRegistrationFormSubmit}
														/>
													)}													
											</div>
											<div className='registration-container-wrapper-sing-in'>
												<span className='sing-in-text'>Do have an account?</span>
												<Link to='/login' >
													<span className='sing-in-link'>Sing In</span>
												</Link>
											</div>
										</>) : (<Loading />)}									
								</div>
							</div>
						</div>
					</>
				)
			}
		</>
	);
};

export default RegistrationPage;
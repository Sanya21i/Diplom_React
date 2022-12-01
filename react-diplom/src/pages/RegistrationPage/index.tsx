import React, { useState, useCallback, useMemo } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { registration } from '../../services/authServices';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import './RegistrationPage.scss';

const initialRegistrationForm = { username: '', email: '', password: '' };

const RegistrationPage = () => {
   const [registrationForm, setRegistrationForm] = useState(initialRegistrationForm);
   const [isRegistered, setIsRegistered] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const onRegistrationFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			setRegistrationForm( prevState => ({ ...prevState, [e.target.id]: e.target.value }));
		}, []);

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
	
	const isButtonDisabled = useMemo(() => {
		const formValues = Object.values(registrationForm);		
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		return !(formValues.filter(item => !!item).length === formValues.length) || !re.test(String(formValues[1]).toLowerCase()) || formValues[2].length <= 8
	}, [registrationForm]);

	return (
		<>
			{
				isRegistered ? (

					<div className='error-items'>
						<div className='error-items-container'>
							<div className='error-items-container-wrap'>
								<h2>Pleaes check email to verify your account!</h2>
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
													<div className='registration-container-wrapper-username-input'>
														<Input placeholder='Your username' className='c2-p' onChange={onRegistrationFormChange} fieldName='username' value={registrationForm.username} />													
													</div>
											</div>	
											<div className='registration-container-wrapper-email'>									
												<div className='registration-container-wrapper-email-title'>
													<p className='b1'>Email</p>
												</div>
												<div className='registration-container-wrapper-email-input'>
													<Input className='c2-p' placeholder='Your email' onChange={onRegistrationFormChange} fieldName='email' value={registrationForm.email} />													
												</div>
											</div>
											<div className='registration-container-wrapper-password'>
												<div className='registration-container-wrapper-password-title'>
													<p className='b1'>Password</p>
												</div>
												<div className='registration-container-wrapper-password-input'>
													<Input onChange={onRegistrationFormChange} fieldName='password' value={registrationForm.password} className='c2-p' placeholder='Your password' />												
												</div>
												<div className='registration-container-wrapper-password-text'>
													<p className='c2-p'>Forgot password?</p>
												</div>
											</div>
											<div className='registration-container-wrapper-button'>
												<Button disabled={isButtonDisabled} type='button' text='Sign up' onClick={onRegistrationFormSubmit} />
											</div>
											<div className='registration-container-wrapper-sing-up'>
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
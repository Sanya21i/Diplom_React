import React, { useState, useCallback, useMemo } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { registration } from '../../services/authServices';
import { Link } from 'react-router-dom';

const initialRegistrationForm = { username: '' , email: '', password: '' };

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
		return !(formValues.filter(item => !!item).length === formValues.length)
	}, [registrationForm]);

	return (
		<>
			{
				isRegistered ? (
					<div>
						<p>Pleaes check email to verify your account!</p>
						<Link to='/login'>
							<Button text='Go to the login page' />
						</Link>
					</div>
				) : (
					<>
						{!isLoading ? (
							<>
								<div className="container">
									<div className="wrapper-form">
										{errorMessage && <p> {errorMessage} </p>}
										<Input onChange={onRegistrationFormChange} fieldName="username" value={registrationForm.username} />
										<Input onChange={onRegistrationFormChange} fieldName="email" value={registrationForm.email} />
										<Input onChange={onRegistrationFormChange} fieldName="password" value={registrationForm.password} />
										<Button disabled={isButtonDisabled} type='button' text='Sign up' onClick={onRegistrationFormSubmit} />
									</div>
								</div>
							</>
						) : (<div>Loading...</div>)}
					</>
				)
			}
		</>
	);
};

export default RegistrationPage;
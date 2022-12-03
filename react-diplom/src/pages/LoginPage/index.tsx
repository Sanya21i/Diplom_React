import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import './LoginPage.scss';
import Button from '../../components/Button';
import { authActionCreators } from '../../redux/actions/authActionCreators';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { errorAuthSelector, isLoadingAuthSelector, isAuthAuthSelector } from '../../redux/selectors/authSelectors';
import Loading from '../../components/Loading';
import { checkEmail } from '../../constants';

const initialLoginForm = { email: '', password: '' };

const LoginPage = () => {
	const [loginForm, setLoginForm] = useState(initialLoginForm);

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
	}, []);

	const onLoginFormSubmit = useCallback(() =>
		dispatch(authActionCreators.getLogin({ email: loginForm.email, password: loginForm.password })),
		[dispatch, loginForm.email, loginForm.password]
	);

	const isButtonDisabled = useMemo(() => {
		const formValues = Object.values(loginForm);
		let [email, password] = formValues;
		
		return !(formValues.filter(item => !!item).length === formValues.length) || !checkEmail.test(String(email).toLowerCase()) || password.length <= 8
	}, [loginForm]);

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
									<div className='login-container-wrapper-email-input'>
										<Input className='c2-p' placeholder='Your email' onChange={onLoginFormChange} fieldName='email' value={loginForm.email} />
									</div>
								</div>
								<div className='login-container-wrapper-password'>
									<div className='login-container-wrapper-password-title'>
										<p className='b1'>Password</p>
									</div>
									<div className='login-container-wrapper-password-input'>
										<Input className='c2-p' placeholder='Your password' onChange={onLoginFormChange} fieldName='password' value={loginForm.password} />
									</div>
									<div className='login-container-wrapper-password-text'>
										<p className='c2-p'>Forgot password?</p>
									</div>
								</div>
								<div className='login-container-wrapper-button'>
									<Button disabled={isButtonDisabled} type='button' text='Sign in' onClick={onLoginFormSubmit} />
								</div>
								<div className='login-container-wrapper-sing-up'>
									<span className='sing-up-text'>Don't have an account?</span>
									<Link to='/registration' >
										<span className='sing-up-link'>Sing Up</span>
									</Link>
								</div>
							</>) : (<Loading />)}						
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
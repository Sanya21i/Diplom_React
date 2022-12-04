import { useParams } from 'react-router';
import { useEffect, useState} from 'react';
import { accountActivation } from '../../services/authServices';
import { Link } from 'react-router-dom';
import Button from '../../components/Button'; 
import Loading from '../../components/Loading';
import './ActivationPage.scss'

const ActivationPage = () => {
	const { uid, id } = useParams();
	const [isActivated, setIsActivated] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (uid && id) {
			const activateAccount = async () => {
				try {
					setIsLoading(true);
					const response = await accountActivation({ uid, token: id });

					if (response) {
						setIsActivated(true);
					}
				} catch (e: any) {
					setErrorMessage(e?.response?.data?.detail as string);
				} finally {
					setIsLoading(false);
				}
			};
			activateAccount()
		}
	}, [uid, id]);

	return (
		<>
			{
				isActivated ? (
					<div className='activation-container'>
						<div className='activation-container-wrapper'>
							<h2>Your account is successfully activated!</h2>
							<Link to='/login'>
								<Button className='b1-p' text='Go to the login page' />
							</Link>
						</div>						
					</div>
				) : (
					<>
						{!isLoading ? (
							<>
								<div className='container-error-activation'>
									<div className='wrapper-activation-page'>
										{errorMessage && <p> {errorMessage} </p>}
									</div>
								</div>
							</>
						) : (<Loading />)}
					</>
				)
			}
		</>
	)
};

export default ActivationPage;
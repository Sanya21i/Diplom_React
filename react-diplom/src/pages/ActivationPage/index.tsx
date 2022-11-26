import { useParams } from 'react-router';
import { useEffect, useState} from 'react';
import { accountActivation } from '../../services/authServices';
import { Link } from 'react-router-dom';
import Button from '../../components/Button'; 
import Loading from '../../components/Loading';

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
					<div>
						<p>Your account is successfully activated!</p>
						<Link to='/login'>
							<Button text='Go to the login page' />
						</Link>
					</div>
				) : (
					<>
						{!isLoading ? (
							<>
								<div className='container'>
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
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { isAuthAuthSelector } from '../../redux/selectors/authSelectors';
import { useEffect } from 'react';
import { getAuthorizedUserInfo } from '../../services/authServices';
import { authActionCreators } from '../../redux/actions/authActionCreators';
import { AxiosResponse } from 'axios';
import { IAuthResponseActivatedUserData } from '../../types/authTypes';
import { Navigate, Outlet } from 'react-router';

const PersistLogin = () => {
	const token = localStorage.getItem('accessToken');
	
	const isAuth = useAppSelector(isAuthAuthSelector);
	
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		if (token) {
			const getAuthUserData = async () => {
				try {
					const userData: AxiosResponse<IAuthResponseActivatedUserData> = await getAuthorizedUserInfo();
					
					dispatch(authActionCreators.getLoginDataSuccess({ ...userData.data }));
				} catch (e) {
					console.error(e)
				}
			}
			
			getAuthUserData();
		}
	}, [dispatch, token]);
	
	return isAuth || token ? <Outlet /> : <Navigate to='/login' replace />
}

export default PersistLogin;
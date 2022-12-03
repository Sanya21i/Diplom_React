import { all, takeLatest, put, call } from 'redux-saga/effects';
import { LOGIN } from '../../actions/actions';
import { authActionCreators } from '../../actions/authActionCreators';
import { AxiosResponse } from 'axios';
import { login, getAuthorizedUserInfo } from '../../../services/authServices';
import { IAuthResponseLoginData, IAuthResponseActivatedUserData } from '../../../types/authTypes';

function* fetchLogin({ payload: { email, password } }: ReturnType<typeof authActionCreators.getLogin>) {
	try {
      yield put(authActionCreators.setAuthLoading(true));
      
      const response: AxiosResponse<IAuthResponseLoginData> = yield call(login, { email, password })
		if (response.data && response.status === 200) {
			const accessToken = response.data.access;
			const refreshToken = response.data.refresh;

         localStorage.setItem('accessToken', accessToken);
         localStorage.setItem('refreshToken', refreshToken);

			const userData: AxiosResponse<IAuthResponseActivatedUserData> = yield call(getAuthorizedUserInfo)
         
			yield put(authActionCreators.getLoginDataSuccess({ ...userData.data }));
		}
	} catch (e: any) {
		yield put(authActionCreators.getLoginDataFailure(e?.response?.data?.detail));
	} finally {
      yield put(authActionCreators.setAuthLoading(false)); 
   }
}

export function* watchAuthSaga() {
   yield all([takeLatest(LOGIN, fetchLogin)])
}
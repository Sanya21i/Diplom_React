import { InferActionType } from '../../store';
import { AUTH_LOADING, LOGIN, GET_LOGIN_DATA_SUCCESS, GET_LOGIN_DATA_FAILURE, LOGOUT } from '../actions';
import { IAuthRequestLoginData, IAuthResponseActivatedUserData } from '../../../types/authTypes';

export const authActionCreators = {

   getLogin: (loginData: IAuthRequestLoginData) => {
		return {
			type: LOGIN,
			payload: loginData,
		};
	},

	setAuthLoading: (isLoading: boolean) => {
		return {
			type: AUTH_LOADING,
			payload: isLoading,
		};
   },

	getLoginDataSuccess: (data: IAuthResponseActivatedUserData) => {
		return {
			type: GET_LOGIN_DATA_SUCCESS,
			payload: data,
		}
	},

	getLoginDataFailure: (error: any) => {
		return {
			type: GET_LOGIN_DATA_FAILURE,
			payload: error,
		}
	},

	logout: () => {
		return {
			type: LOGOUT,
		}
	}
};

export type AuthActionType = InferActionType<typeof authActionCreators>;
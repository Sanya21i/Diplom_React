import { Reducer } from 'redux';
import { AUTH_LOADING, GET_LOGIN_DATA_FAILURE, GET_LOGIN_DATA_SUCCESS } from '../../actions/actions';
import { AuthActionType } from '../../actions/authActionCreators';
import { IAuthResponseActivatedUserData } from '../../../types/authTypes';

interface IInitialAuthState {
	data: IAuthResponseActivatedUserData;
	isLoading: boolean;
	error: null | string;
	isAuth: boolean;
};

const initialState: IInitialAuthState = {
	data: {} as IAuthResponseActivatedUserData,
	isLoading: false,
	error: null,
	isAuth: false,
};

const authReducer: Reducer<IInitialAuthState, AuthActionType> = ( state = initialState, action) => {
   switch (action.type) {
		case AUTH_LOADING:
			return { ...state, isLoading: action.payload }
		case GET_LOGIN_DATA_SUCCESS:
			return { ...state, data: { ...action.payload }, error: null, isAuth: true }
		case GET_LOGIN_DATA_FAILURE:
			return { ...state, error: action.payload }
		default:
			return state;
	}
};

export default authReducer;
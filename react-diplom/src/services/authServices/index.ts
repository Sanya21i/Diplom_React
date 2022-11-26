import { axiosPrivate } from '../../api';
import { IAuthRequestLoginData, IAuthResponseLoginData, IAuthRequestRegistartionData, IAuthResponseRegistrationData, IAuthRequestActivationData, IAuthResponseActivationData, IAuthResponseActivatedUserData, IAuthRequestRefreshToken, IAuthResponseRefreshToken } from '../../types/authTypes';

export const login = async ({ email, password }: IAuthRequestLoginData) => {
	return await axiosPrivate.post<IAuthResponseLoginData>(`/auth/jwt/create/`, { email, password });
};

export const registration = async ({ username, email, password }: IAuthRequestRegistartionData) => {
	return await axiosPrivate.post<IAuthResponseRegistrationData>(`/auth/users/`, { username, email, password });
};

export const accountActivation = async ({ uid, token }: IAuthRequestActivationData) => {
	return await axiosPrivate.post<IAuthResponseActivationData>(`/auth/users/activation/`, { uid, token });
};

export const getAuthorizedUserInfo = async () => {
   return await axiosPrivate.get<IAuthResponseActivatedUserData>(`/auth/users/me/`);
};

export const refreshToken = async ({ refresh }: IAuthRequestRefreshToken) => {
   return await axiosPrivate.post<IAuthResponseRefreshToken>(`/auth/jwt/refresh/`, { refresh });
};
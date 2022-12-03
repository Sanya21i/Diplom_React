import { RootState } from '../../store';

export const errorAuthSelector = (state: RootState) => state.auth.error;
export const isLoadingAuthSelector = (state: RootState) => state.auth.isLoading;
export const dataAuthSelector = (state: RootState) => state.auth.data;
export const isAuthAuthSelector = (state: RootState) => state.auth.isAuth;
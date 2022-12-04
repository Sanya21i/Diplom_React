import { INewsPost } from '../../../types/newsTypes';
import { InferActionType } from '../../store';
import { GET_INDIVID_NEW, GET_INDIVID_NEWS_SUCCESS, GET_NEWS, GET_NEWS_FAILER, GET_NEWS_SUCCESS, NEWS_LOADING } from '../actions';

export const newsActionCreators = {
	getNews: () => {
		return {
			type: GET_NEWS,
		}
	},

	setNewsLoading: (isLoading: boolean) => {
		return {
			type: NEWS_LOADING,
			payload: isLoading, 
		}
	},

	getNewsSuccess: (news: INewsPost[]) => {
		return {
			type: GET_NEWS_SUCCESS,
			payload: news,
		}
	},

	getNewsFailure: (error: string) => {
		return {
			type: GET_NEWS_FAILER,
			payload: error,
		}
	},

	getIndividNew: ( id : string) => {
		return {
			type: GET_INDIVID_NEW,
			payload: { id }
		};
	},

	getIndividNewSuccess: (news: INewsPost) => {
		return {
			type: GET_INDIVID_NEWS_SUCCESS,
			payload: news,
		};
	},
};

export type newsActionType = InferActionType<typeof newsActionCreators>;
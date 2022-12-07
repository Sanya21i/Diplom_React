import { INewsPost } from '../../../types/newsTypes';
import { InferActionType } from '../../store';
import { GET_INDIVID_NEW, GET_INDIVID_NEWS_SUCCESS, GET_NEWS, GET_NEWS_FAILER, GET_NEWS_PAGES_COUNT, GET_NEWS_PAGES_COUNT_SUCCESS, GET_NEWS_SUCCESS, GET_NEWS_WITH_FILTER, GET_NEWS_WITH_PAGE, GET_NEWS_WITH_SORT, NEWS_LOADING, SET_NEWS_FILTER, SET_NEWS_PAGE, SET_NEWS_SORT } from '../actions';

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

	setNewsPagesCount: () => {
		return {
			type: GET_NEWS_PAGES_COUNT,
		}
	},

	getNewsPagesCountSuccess: (count: number) => {
		return {
			type: GET_NEWS_PAGES_COUNT_SUCCESS,
			payload: count,
		}
	},

	getNewsWithFilter: (filter: string) => {
		return {
			type: GET_NEWS_WITH_FILTER,
			payload: filter,
		}
	},

	setNewsFilter: (filter: string) => {
		return {
			type: SET_NEWS_FILTER,
			payload: filter,
		}
	},

	setNewsSort: (sort: string) => {
		return {
			type: SET_NEWS_SORT,
			payload: sort,
		}
	},

	getNewsWithSort: (sort: string) => {
		return {
			type: GET_NEWS_WITH_SORT,
			payload: sort,
		}
	},	
	
	getNewsWithPage: (page: number | string) => {
		return {
			type: GET_NEWS_WITH_PAGE,
			payload: page,
		}
	},
	
	setNewsPage: (page: number | string) => {
		return {
			type: SET_NEWS_PAGE,
			payload: page,
		}
	},
};

export type newsActionType = InferActionType<typeof newsActionCreators>;
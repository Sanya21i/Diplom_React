import { INewsPost } from '../../../types/newsTypes';
import { GET_INDIVID_NEWS_SUCCESS, GET_NEWS_FAILER, GET_NEWS_PAGES_COUNT_SUCCESS, GET_NEWS_SUCCESS, NEWS_LOADING, SET_NEWS_FILTER, SET_NEWS_PAGE, SET_NEWS_SORT } from '../../actions/actions';

interface IInitialNewsState {
	news: INewsPost[];
	isLoading: boolean;
	error: null | string;
	filter: string;
	currentPage: number;
	pageCount: number;
	sort: string;
}

const initialNewsState: IInitialNewsState = {
	news: [],
	isLoading: false,
	error: null,
	filter: '',
	currentPage: 1,
	pageCount: 0,
	sort: 'id',
}

const newsReducer = (state = initialNewsState, action: any) => {
	switch (action.type) {
		case NEWS_LOADING:
			return { ...state, isLoading: action.payload }
		case GET_NEWS_SUCCESS:
			return { ...state, news: [...action.payload] }
		case GET_NEWS_FAILER:
			return { ...state, error: action.payload } 		
		case GET_INDIVID_NEWS_SUCCESS:
			return { ...state, news: [{ ...action.payload }], error: null }
		case SET_NEWS_FILTER:
			return { ...state, filter: action.payload }
		case SET_NEWS_SORT:
			return { ...state, sort: action.payload }
		case GET_NEWS_PAGES_COUNT_SUCCESS:
			return { ...state, pageCount: action.payload }
		case SET_NEWS_PAGE:
			return { ...state, currentPage: action.payload }
	}
	return state;
};

export default newsReducer;
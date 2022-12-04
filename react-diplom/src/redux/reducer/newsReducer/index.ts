import { INewsPost } from '../../../types/newsTypes';
import { GET_INDIVID_NEWS_SUCCESS, GET_NEWS_FAILER, GET_NEWS_SUCCESS, NEWS_LOADING } from '../../actions/actions';

interface IInitialNewsState {
	news: INewsPost[];
	isLoading: boolean;
	error: null | string;
	currentPage: number;
	pageCount: number;
}

const initialNewsState: IInitialNewsState = {
	news: [],
	isLoading: false,
	error: null,
	currentPage: 1,
	pageCount: 0,	
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
	}
	return state;
};

export default newsReducer;
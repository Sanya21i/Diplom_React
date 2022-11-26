import { IBlogPost } from '../../../types/blogsTypes';
import { BLOGS_LOADING, GET_BLOGS_FAILER, GET_BLOGS_SUCCESS } from '../../actions/actions';


interface IInitialBlogsState {
	blogs: IBlogPost[];
	isLoading: boolean;
	error: null | string;
	filter: string;
	currentPage: number;
	pageCount: number;
}

const initialState: IInitialBlogsState = {
	blogs: [],
	isLoading: false,
	error: null,
	filter: '',
	currentPage: 1,
	pageCount: 0
}

const blogsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case BLOGS_LOADING:
			return { ...state, isLoading: action.payload }
		case GET_BLOGS_SUCCESS:
			return { ...state, blogs: [ ...action.payload ], error: null, currentPage: 1 }
		case GET_BLOGS_FAILER:
			return { ...state, error: action.payload }
	}
	return state;
};

export default blogsReducer;
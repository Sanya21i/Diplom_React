import { IBlogPost } from '../../../types/blogsTypes';
import { InferActionType } from '../../store';
import { BLOGS_LOADING, GET_BLOGS, GET_BLOGS_FAILER, GET_BLOGS_SUCCESS, GET_BLOGS_WITH_FILTER, GET_PAGES_COUNT, GET_PAGES_COUNT_SUCCESS, SET_FILTER, GET_BLOGS_WITH_PAGE, SET_PAGE } from '../actions';

export const blogsActionCreators = {
   getBlogs: () => {
		return {
			type: GET_BLOGS,
		} 
	},	

	setPagesCount: () => {
		return {
			type: GET_PAGES_COUNT,
		}
	},

	setBlogsLoading: (isLoading: boolean) => {
		return {
			type: BLOGS_LOADING,
			payload: isLoading, 
		}
	},

	getBlogsSuccess: (blogs: IBlogPost[]) => {
		return {
			type: GET_BLOGS_SUCCESS,
			payload: blogs,
		}
	},

	getBlogsFailure: (error: string) => {
		return {
			type: GET_BLOGS_FAILER,
			payload: error,
		}
	},

	getBlogsPagesCountSuccess: (count: number) => {
		return {
			type: GET_PAGES_COUNT_SUCCESS,
			payload: count,
		}
	},

	getBlogsWithFilter: (filter: string) => {
		return {
			type: GET_BLOGS_WITH_FILTER,
			payload: filter,
		}
	},

	setBlogsFilter: (filter: string) => {
		return {
			type: SET_FILTER,
			payload: filter,
		}
	},
	
	getBlogsWithPage: (page: number | string) => {
		return {
			type: GET_BLOGS_WITH_PAGE,
			payload: page,
		}
	},
	
	setBlogsPage: (page: number | string) => {
		return {
			type: SET_PAGE,
			payload: page,
		}
	},
};

export type BlogsActionType = InferActionType<typeof blogsActionCreators>;
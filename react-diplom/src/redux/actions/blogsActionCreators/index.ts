import { IBlogPost } from '../../../types/blogsTypes';
import { InferActionType } from '../../store';
import { BLOGS_LOADING, GET_BLOGS, GET_BLOGS_FAILER, GET_BLOGS_SUCCESS } from '../actions';

export const blogsActionCreators = {
   getBlogs: () => {
		return {
			type: GET_BLOGS,
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


};

export type BlogsActionType = InferActionType<typeof blogsActionCreators>;
import { IBlogPost } from '../../../types/blogsTypes';
import { InferActionType } from '../../store';
import { BLOGS_LOADING, GET_BLOGS, GET_BLOGS_FAILER, GET_BLOGS_SUCCESS, GET_BLOGS_WITH_FILTER, GET_PAGES_COUNT, GET_PAGES_COUNT_SUCCESS, SET_FILTER, GET_BLOGS_WITH_PAGE, SET_PAGE, GET_INDIVID_BLOG, GET_INDIVID_BLOG_SUCCESS } from '../actions';

export const blogsActionCreators = {
   getBlogs: () => {
		return {
			type: GET_BLOGS,
		} 
	},	

	getIndividBlog: ( id : string) => {
		return {
			type: GET_INDIVID_BLOG,
			payload: { id }
		};
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

	getIndividBlogSuccess: (blog: IBlogPost) => {
		return {
			type: GET_INDIVID_BLOG_SUCCESS,
			payload: blog,
		};
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
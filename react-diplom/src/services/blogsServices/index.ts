import { axiosContent } from '../../api';
import { IBlogPost, IBlogsResponsePagesCount } from '../../types/blogsTypes';

export const getBlogs = async ({filter = '', page = 1, limit = 12}: {filter?: string, page?: number, limit?: number }) => {
	return await axiosContent.get<IBlogPost[]>(`/v3/blogs?_limit=${limit}&summary_contains=${filter}&_start=${limit*(page-1)}`)
};

export const getPagesCount = async () => {
	return await axiosContent.get<IBlogsResponsePagesCount>(`/v3/blogs/count`)
};
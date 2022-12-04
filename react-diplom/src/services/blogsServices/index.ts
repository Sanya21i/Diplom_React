import { axiosContent } from '../../api';
import { IBlogPost, IBlogsResponsePagesCount } from '../../types/blogsTypes';

export const getBlogs = async ({ filter = '', page = 1, limit = 12, sort }: { filter?: string, page?: number, limit?: number, sort?: string }) => {
	return await axiosContent.get<IBlogPost[]>(`/v3/blogs?_limit=${limit}&summary_contains=${filter}&_start=${limit*(page-1)}&_sort=${sort}`)
};

export const getPagesCount = async () => {
	return await axiosContent.get<IBlogsResponsePagesCount>(`/v3/blogs/count`)
};

export const getIndividBlog = async ({ id = '' }: { id?: string }) => {
	return await axiosContent.get<IBlogPost[]>(`/v3/blogs/${id}`);
};
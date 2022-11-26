import { axiosContent } from '../../api';
import { IBlogPost } from '../../types/blogsTypes';

export const getBlogs = async () => {
	return await axiosContent.get<IBlogPost[]>(`/v3/blogs`)
};
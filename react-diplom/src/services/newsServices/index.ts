import { axiosContent } from '../../api';
import { INewsPost } from '../../types/newsTypes';

export const getNews = async () => {
	return await axiosContent.get<INewsPost[]>(`/v3/articles`)
};

export const getIndividNew = async ({ id = '' }: { id?: string }) => {
	return await axiosContent.get<INewsPost[]>(`/v3/articles/${id}`);
};
import { axiosContent } from '../../api';
import { INewsPost, INewsResponsePagesCount } from '../../types/newsTypes';

export const getNews = async ({ filter = '', page = 1, limit = 12, sort }: { filter?: string, page?: number, limit?: number, sort?: string }) => {
	return await axiosContent.get<INewsPost[]>(`/v3/articles?_limit=${limit}&summary_contains=${filter}&_start=${limit*(page-1)}&_sort=${sort}`)
};

export const getNewsPagesCount = async () => {
	return await axiosContent.get<INewsResponsePagesCount>(`/v3/articles/count`)
};

export const getIndividNew = async ({ id = '' }: { id?: string }) => {
	return await axiosContent.get<INewsPost[]>(`/v3/articles/${id}`);
};
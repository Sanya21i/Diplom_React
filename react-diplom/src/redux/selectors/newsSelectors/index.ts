import { RootState } from '../../store';

export const newsPostsNewsSelector = (state: RootState) => state.news.news;
export const filterNewsSelector = (state: RootState) => state.news.filter;
export const sortNewsSelector = (state: RootState) => state.news.sort;
export const pagesCountNewsSelector = (state: RootState) => state.news.pageCount;
export const currentPageNewsSelector = (state: RootState) => state.news.currentPage;
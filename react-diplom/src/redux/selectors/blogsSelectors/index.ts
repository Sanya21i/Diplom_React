import { RootState } from '../../store'

export const blogsPostsBlogsSelector = (state: RootState) => state.blogs.blogs;
export const filterBlogsSelector = (state: RootState) => state.blogs.filter;
export const pagesCountBlogsSelector = (state: RootState) => state.blogs.pageCount;
export const currentPageBlogsSelector = (state: RootState) => state.blogs.currentPage;

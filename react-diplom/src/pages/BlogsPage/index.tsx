import React, { useEffect, useCallback } from 'react';
import BlogList from '../../components/BlogList';
import Pagination from '../../components/Plagination';
import { blogsActionCreators } from '../../redux/actions/blogsActionCreators';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { blogsPostsBlogsSelector, currentPageBlogsSelector, pagesCountBlogsSelector } from '../../redux/selectors/blogsSelectors';

const BlogsPage = () => {
	const dispatch = useAppDispatch();
	
	const blogs = useAppSelector(blogsPostsBlogsSelector);
	const pagesCount = useAppSelector(pagesCountBlogsSelector);
	const page: number = useAppSelector(currentPageBlogsSelector);
	//const onPageChange = (page: number | string) => {
	//	dispatch(blogsActionCreators.getBlogsWithPage(page))
	//};
	const onPageChange = useCallback((page: number | string) =>
		dispatch(blogsActionCreators.getBlogsWithPage(page)),
		[dispatch]
	);

	useEffect(() => {
		dispatch(blogsActionCreators.getBlogs());
		dispatch(blogsActionCreators.setPagesCount());
	}, [dispatch]);

	return (
		<>
			<div>Main</div>
			<BlogList blogs={blogs} />
			<Pagination
				currentPage={page}
				pageCount={pagesCount}
            blogsPageLimit={12}
            className='pagination'
            siblingCount={1}
            onPageChange={page => onPageChange(page)}
         />
		</>
	);
};

export default BlogsPage;
import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../../components/BlogList';
import Pagination from '../../components/Pagination';
import Select from '../../components/Select';
import { OPTIONS } from '../../constants';
import { blogsActionCreators } from '../../redux/actions/blogsActionCreators';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { blogsPostsBlogsSelector, currentPageBlogsSelector, filterBlogsSelector, pagesCountBlogsSelector } from '../../redux/selectors/blogsSelectors';
import './BlogsPage.scss';

const BlogsPage = () => {
	const dispatch = useAppDispatch();	
	const blogs = useAppSelector(blogsPostsBlogsSelector);
	const pagesCount = useAppSelector(pagesCountBlogsSelector);
	const page: number = useAppSelector(currentPageBlogsSelector);
	const filter = useAppSelector(filterBlogsSelector);

	const onPageChange = useCallback((page: number | string) => {
		dispatch(blogsActionCreators.getBlogsWithPage(page))
	}, [dispatch]);

	const onSortItemChange = useCallback((sortItem: string) => {
		dispatch(blogsActionCreators.getBlogsWithSort(sortItem))
	}, [dispatch]);

	useEffect(() => {
		dispatch(blogsActionCreators.getBlogs());
		dispatch(blogsActionCreators.setPagesCount());
	}, [dispatch]);

	const onPagePagination = useCallback((page: number | string) => {
		return (onPageChange(page))
	}, [onPageChange]);

	const onSortItemChangeSelect = useCallback((sortItem: string) => {
		return (onSortItemChange(sortItem))
	}, [onSortItemChange]);

	return (
		<>
			<div className='blogs-container'>
				{!filter ? (
					<>
						<h1 className='blogs-container-title'>Blog</h1>
						<div className='blogs-container-wrapper'>
							<div className='blogs-container-wrapper-articles'>
								<span className='s1'>Articles</span>							
							</div>							
							<Link to='/news'>
								<div className='blogs-container-wrapper-news'>
									<span className='s1'>News</span>
								</div>
							</Link>
						</div>
						<div className='blogs-container-select'>
							<Select options={OPTIONS} onChange={onSortItemChangeSelect} />
						</div>						
						<BlogList items={blogs} />
						<Pagination
							currentPage={page}
							pageCount={pagesCount}
							blogsPageLimit={12}
							className='pagination-blogs'
							siblingCount={1}
							onPageChange={onPagePagination}
						/>
					</>					
				) : (
					<>
						<h1 className='blogs-container-search'>Search results ‘{ filter }’</h1>
						<BlogList items={blogs} />
						<Pagination
							currentPage={page}
							pageCount={pagesCount}
							blogsPageLimit={12}
							className='pagination-blogs'
							siblingCount={1}
							onPageChange={onPagePagination} />
					</>
				)}				
			</div>			
		</>
	);
};

export default BlogsPage;
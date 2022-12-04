import React, { useCallback, useEffect, useState } from 'react';
import BlogList from '../../components/BlogList';
import Pagination from '../../components/Pagination';
import Select from '../../components/Select';
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
	
	const OPTIONS = [		
		{ label: 'Clear sort', value: '' },
		{ label: 'Title (A-Z)', value: 'title' },
		{ label: 'Description (A-Z)', value: 'summary' },
	];
	
	const [sortItem, setSortItem] = useState(OPTIONS[0].value)

	const onPageChange = useCallback((page: number | string) => {
		dispatch(blogsActionCreators.getBlogsWithPage(page))
	}, [dispatch]);

	const onSortItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortItem(e.target.value);
		dispatch(blogsActionCreators.getBlogsWithSort(e.target.value))
	}

	useEffect(() => {
		dispatch(blogsActionCreators.getBlogs());
		dispatch(blogsActionCreators.setPagesCount());
	}, [dispatch]);

	return (
		<>
			<div className='blogs-container'>
				{!filter ? (
					<>
						<h1 className='blogs-container-title'>Blog</h1>
						<div className='blogs-container-select'>
							<Select options={OPTIONS} value={sortItem} onChange={onSortItemChange} />
						</div>						
						<BlogList blogs={blogs} />
						<Pagination
							currentPage={page}
							pageCount={pagesCount}
							blogsPageLimit={12}
							className='pagination-blogs'
							siblingCount={1}
							onPageChange={page => onPageChange(page)}
						/>
					</>					
				) : (
					<>
						<h1 className='blogs-container-search'>Search results ‘{ filter }’</h1>
						<BlogList blogs={blogs} />
						<Pagination
							currentPage={page}
							pageCount={pagesCount}
							blogsPageLimit={12}
							className='pagination-blogs'
							siblingCount={1}
							onPageChange={page => onPageChange(page)} />
					</>
				)}				
			</div>			
		</>
	);
};

export default BlogsPage;
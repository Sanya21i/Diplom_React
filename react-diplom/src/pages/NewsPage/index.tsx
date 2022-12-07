import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsList from '../../components/NewsList';
import Pagination from '../../components/Pagination';
import Select from '../../components/Select';
import { OPTIONS } from '../../constants';
import { newsActionCreators } from '../../redux/actions/newsActionCreators';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { currentPageNewsSelector, filterNewsSelector, newsPostsNewsSelector, pagesCountNewsSelector } from '../../redux/selectors/newsSelectors';
import './NewsPage.scss';

const NewsPage = () => {
	const dispatch = useAppDispatch();	
	const news = useAppSelector(newsPostsNewsSelector);
	const pagesCount = useAppSelector(pagesCountNewsSelector);
	const page: number = useAppSelector(currentPageNewsSelector);
	const filter = useAppSelector(filterNewsSelector);
	
	const onPageChange = useCallback((page: number | string) => {
		dispatch(newsActionCreators.getNewsWithPage(page))
	}, [dispatch]);

	const onSortItemChange = useCallback((sortItem: string) => {
		dispatch(newsActionCreators.getNewsWithSort(sortItem))
	}, [dispatch]);

	useEffect(() => {
		dispatch(newsActionCreators.getNews());
		dispatch(newsActionCreators.setNewsPagesCount());
	}, [dispatch]);

	const onPagePagination = useCallback((page: number | string) => {
		return (onPageChange(page))
	}, [onPageChange]);

	const onSortItemChangeSelect = useCallback((sortItem: string) => {
		return (onSortItemChange(sortItem))
	}, [onSortItemChange]);

	return (
		<>
			<div className='news-container'>
				{!filter ? (
					<>
						<h1 className='news-container-title'>News</h1>
						<div className='news-container-wrapper'>
							<div className='news-container-wrapper-articles'>
								<Link to='/main'>
									<span className='s1'>Articles</span>
								</Link>
							</div>
							<div className='news-container-wrapper-news'>
								<span className='s1'>News</span>
							</div>
						</div>
						<div className='news-container-select'>
							<Select options={OPTIONS} onChange={onSortItemChangeSelect} />
						</div>	
						<NewsList items={news} />
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
						<h1 className='news-container-search'>Search results ‘{ filter }’</h1>
						<NewsList items={news} />
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
	)
};

export default NewsPage;
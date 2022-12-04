import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsList from '../../components/NewsList';
import { newsActionCreators } from '../../redux/actions/newsActionCreators';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { newsPostsNewsSelector } from '../../redux/selectors/newsSelectors';
import './NewsPage.scss';

const NewsPage = () => {
	const dispatch = useAppDispatch();	
	const news = useAppSelector(newsPostsNewsSelector);

	useEffect(() => {
		dispatch(newsActionCreators.getNews())
	}, [dispatch]);

	return (
		<>
			<div className='news-container'>
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
				<NewsList items={news} />
			</div>			
		</>
	)
};

export default NewsPage;
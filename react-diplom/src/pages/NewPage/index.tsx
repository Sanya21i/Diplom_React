import { faFacebookF, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { newsActionCreators } from '../../redux/actions/newsActionCreators';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { newsPostsNewsSelector } from '../../redux/selectors/newsSelectors';
import './NewPage.scss';

const NewPage = () => {	
	const { id } = useParams();
	const [news] = useAppSelector(newsPostsNewsSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		id && dispatch(newsActionCreators.getIndividNew(id));
	}, [dispatch, id]);	
	
	return (
		<>
			<div className='new-container'>
				<div className='new-container-nav'>
					<Link to='/news' >
						<span className='new-container-nav-main h1-p'>Main</span>
					</Link>
					<span className='new-container-nav-text h1-p'>/Post {id}</span>
				</div>
				<div className='new-container-title'>
					<h1>{news.title}</h1>
				</div>
				<div className='new-container-img'>
					<img src={`${news.imageUrl}`} alt=''/>
				</div>
				<div className='new-container-text b1-p'>{news.summary}</div>
				<div className='new-container-social'>
					<div className='new-container-social-facebook'>
						<a href='https://www.facebook.com/'>
							<FontAwesomeIcon icon={ faFacebookF } />
						</a>
					</div>
					<div className='new-container-social-twitter'>
						<a href='https://www.twitter.com/'>
							<FontAwesomeIcon icon={ faSquareTwitter } />
						</a>
					</div>					
				</div>
				<div className='new-container-news'></div>
			</div>			
		</>		
	)
};

export default NewPage;
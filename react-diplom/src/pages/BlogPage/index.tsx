import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogsActionCreators } from '../../redux/actions/blogsActionCreators';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { blogsPostsBlogsSelector } from '../../redux/selectors/blogsSelectors';
import { faFacebookF, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './BlogPage.scss';

const BlogPage = () => {
	const { id } = useParams();
	const [blog] = useAppSelector(blogsPostsBlogsSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		id && dispatch(blogsActionCreators.getIndividBlog(id));
	}, [dispatch, id]);
	
	return (
		<>
			<div className='blog-container'>
				<div className='blog-container-nav'>
					<Link to='/main' >
						<span className='blog-container-nav-main h1-p'>Main</span>
					</Link>
					<span className='blog-container-nav-text h1-p'>/Post {id}</span>
				</div>
				<div className='blog-container-title'>
					<h1>{blog.title}</h1>
				</div>
				<div className='blog-container-img'>
					<img src={`${blog.imageUrl}`} alt=''/>
				</div>
				<div className='blog-container-text b1-p'>{blog.summary}</div>
				<div className='blog-container-social'>
					<div className='blog-container-social-facebook'>
						<a href='https://www.facebook.com/'>
							<FontAwesomeIcon icon={ faFacebookF } />
						</a>
					</div>
					<div className='blog-container-social-twitter'>
						<a href='https://www.twitter.com/'>
							<FontAwesomeIcon icon={ faSquareTwitter } />
						</a>
					</div>	
				</div>
				<div className='blog-container-blogs'></div>
			</div>			
		</>		
	)
}

export default BlogPage;


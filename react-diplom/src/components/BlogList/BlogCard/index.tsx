import React from 'react';
import { NavLink } from 'react-router-dom';
import './BlogCard.scss';

interface IBlogCard {
	imgUrl: string;
	publishedAt: string;
	title: string;
	id: number
};

const textСurtail = (text: string) => {
	return text.trim().split(' ').slice(0, 6).join(' ') + '...'
};

const BlogCard = ({ imgUrl, publishedAt, title, id }: IBlogCard) => {	
	return (
		<>
			<div className='wrapper'>
				<div className='wrapper-blogs-background'></div>
				<div className='wrapper-image'>
					<img src={imgUrl} alt='' />
				</div>
				<div className='wrapper-text'>
					<p className='s1'>{publishedAt}</p>
					<NavLink to={'/blog/' + id}>
						{title.split(' ').length > 6 ? (
							<h3 className='wrapper-text-title'>{textСurtail(title)}</h3>
						) : (
							<h3 className='wrapper-text-title'>{title}</h3>	
						)}						
					</NavLink>
				</div>
			</div>			
		</>
	)
};

export default React.memo(BlogCard);
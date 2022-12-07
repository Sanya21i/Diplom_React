import React from 'react';
import { NavLink } from 'react-router-dom';
import './NewsCard.scss';

interface INewsCard {
	imgUrl: string;
	publishedAt: string;
	title: string;
	id: number
};

const textСurtail = (text: string) => {
	return text.trim().split(' ').slice(0, 6).join(' ') + '...'
}

const NewsCard = ({ imgUrl, publishedAt, title, id }: INewsCard) => {	
	return (
		<>
			<div className='wrapper-news-card'>
				<div className='wrapper-news-card-background'></div>
				<div className='wrapper-news-card-image'>
					<img src={imgUrl} alt='' />
				</div>
				<div className='wrapper-news-card-text'>
					<p className='s1'>{publishedAt}</p>
					<NavLink to={'/news/' + id}>
						{title.split(' ').length > 6 ? (
							<h3 className='wrapper-news-card-text-title'>{textСurtail(title)}</h3>
						) : (
							<h3 className='wrapper-news-card-text-title'>{title}</h3>
						)}
					</NavLink>
				</div>
			</div>			
		</>
	)
};

export default React.memo(NewsCard);
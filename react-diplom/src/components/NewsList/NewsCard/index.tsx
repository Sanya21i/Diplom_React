import React from 'react';
import { NavLink } from 'react-router-dom';
import './NewsCard.scss';

interface INewsCard {
	imgUrl: string;
	publishedAt: string;
	title: string;
	id: number
};

const NewsCard = ({ imgUrl, publishedAt, title, id }: INewsCard) => {	
	return (
		<>
			<div className='wrapper'>
				<div><img src={imgUrl} alt='' /></div>
				<div className='wrapper-text'>
					<p className='s1'>{publishedAt}</p>
					<NavLink to={'/news/' + id}>
						<h3 className='wrapper-text-title'>{title}</h3>
					</NavLink>
				</div>
			</div>			
		</>
	)
};

export default React.memo(NewsCard);
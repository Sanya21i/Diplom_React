import React from 'react';
import { NavLink } from 'react-router-dom';
import './BlogCard.scss';

interface IBlogCard {
	imgUrl: string;
	publishedAt: string;
	title: string;
	id: number;
};

const BlogCard = ({ imgUrl, publishedAt, title, id }: IBlogCard) => {	
	return (
		<>
			<div className='wrapper'>
				<div><img src={imgUrl} alt='' /></div>
				<div className='wrapper-text'>
					<p className='s1'>{publishedAt}</p>
					<NavLink to={'/blogs/' + id}><h3 className='wrapper-text-title'>{title}</h3></NavLink>
				</div>
			</div>			
		</>
	)
};

export default React.memo(BlogCard);
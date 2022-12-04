import React from 'react';
import { INewsPost } from '../../types/newsTypes';
import NewsCard from './NewsCard';
import './NewsList.scss';

interface IItemList {
	items: INewsPost[];
};

const NewsList = ({ items }: IItemList) => {	
	return (	
		<ul className='wrapper-news'>
			{items.map(item => {				
				return (
					<React.Fragment key={item.id}>
						<li>							
							<NewsCard id={item.id} imgUrl={item.imageUrl} publishedAt={item.publishedAt} title={item.title} />
						</li>	
					</React.Fragment>
				)
			})}
		</ul>		
	)
};

export default React.memo(NewsList);
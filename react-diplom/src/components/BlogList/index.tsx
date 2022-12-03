import React from 'react';
import { IBlogPost } from '../../types/blogsTypes';
import BlogCard from './BlogCard';
import './BlogList.scss';

interface IBlogList {
	blogs: IBlogPost[];
};

const BlogList = ({ blogs }: IBlogList) => {	
	return (	
		<ul className='wrapper-blogs'>
			{blogs.map(item => {				
				return (
					<React.Fragment key={item.id}>
						<li>							
							<BlogCard id={item.id} imgUrl={item.imageUrl} publishedAt={item.publishedAt} title={item.title} />
						</li>	
					</React.Fragment>
				)
			})}
		</ul>		
	)
};

export default React.memo(BlogList);
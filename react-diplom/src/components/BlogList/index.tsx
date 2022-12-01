import React from 'react';
import { IBlogPost } from '../../types/blogsTypes';
import BlogCard from './BlogCard';

interface IBlogList {
	blogs: IBlogPost[];
};

const BlogList = ({ blogs }: IBlogList) => {
	return (	
		<ul>
			{blogs.map(item => {
				return (
					<React.Fragment key={item.id}>
						<li>
							<BlogCard title={item.title} description={item.summary}  />
						</li>	
					</React.Fragment>
				)
			})}
		</ul>		
	)
};

export default React.memo(BlogList);
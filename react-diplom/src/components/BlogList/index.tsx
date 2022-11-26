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
					<li>
						<BlogCard title={item.title} description={item.summary} key={item.id} />
					</li>					
				)
			})}
		</ul>
	)
};

export default BlogList;
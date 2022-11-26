import React, { useEffect } from 'react';
import BlogList from '../../components/BlogList';
import { blogsActionCreators } from '../../redux/actions/blogsActionCreators';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { blogsPostsBlogsSelector } from '../../redux/selectors/blogsSelectors';

const BlogsPage = () => {
	const dispatch = useAppDispatch();

	const blogs = useAppSelector(blogsPostsBlogsSelector)

	useEffect(() => {
		dispatch(blogsActionCreators.getBlogs());
	}, [dispatch]);

	return (
		<>
			<div>Main</div>
			<BlogList blogs={blogs} />
		</>
	);
};

export default BlogsPage;
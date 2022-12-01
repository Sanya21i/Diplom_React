import React from "react";

interface IBlogCard {
	title: string;
	description: string;
};

const BlogCard = ({ title, description }: IBlogCard) => {
	return (
		<>
			<h4>{title}</h4>
			<p>{description}</p>			
		</>
	)
};

export default React.memo(BlogCard);
import { Link } from "react-router-dom";

const ArticlesPage = () => {
	return (
		<>
			<div>Article</div>
			<div className='blogs-container-wrapper'>
				<span>Articles</span>					
				<Link to='/main'><span>News</span></Link>		
			</div>
		</>
	)
};

export default ArticlesPage;
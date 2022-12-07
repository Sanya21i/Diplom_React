import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

const NotFoundPage = () => {
	return (
		<div className='not_found-container'>
			<h3 className='not_found-container-title'>Sorry this page not found....</h3>
			<Link to='/login' >
				<h2 className='not_found-container-link '>Sing In</h2>
			</Link>
		</div>
	);
};

export default NotFoundPage;
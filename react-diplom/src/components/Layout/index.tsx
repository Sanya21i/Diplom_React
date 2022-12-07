import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import './Layout.scss';

const Layout = () => {
	return (
		<div className='layout'>
			<Header />
			<div className='outlet'>
				<Outlet />
			</div>			
			<Footer />
		</div>
	);
};

export default Layout;
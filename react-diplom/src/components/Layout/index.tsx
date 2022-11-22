import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import './Layout.scss';

const Layout = () => {
  return (
    <>
      <Header />
        <div className="layout-outlet">
            <Outlet />
        </div>        
      <Footer />
    </>
  );
};

export default Layout;
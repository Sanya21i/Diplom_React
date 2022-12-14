import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Layout from './components/Layout';
import './App.scss';
import ActivationPage from './pages/ActivationPage';
import NotFoundPage from './pages/NotFoundPage';
import PersistLogin from './components/PersistLogin';
import BlogsPage from './pages/BlogsPage';
import NewsPage from './pages/NewsPage';
import BlogPage from './pages/BlogPage';
import NewPage from './pages/NewPage';

function App() {
	return (
		<Routes>
			<Route path='*' element={<NotFoundPage />} />
			<Route element={<Layout />}>
				<Route path='/' element={<Navigate to='/login' replace />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/registration' element={<RegistrationPage />} />
				<Route path='/activate/:uid/:id' element={<ActivationPage />} />
				<Route element={<PersistLogin />} >
					<Route path='/main' element={<BlogsPage />} />
					<Route path='/news' element={<NewsPage />} />
					<Route path='/news/:id' element={<NewPage />} />
					<Route path='/blog/:id' element={<BlogPage />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
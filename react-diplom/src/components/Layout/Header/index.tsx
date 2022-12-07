import React, { useCallback, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { dataAuthSelector, isAuthAuthSelector } from '../../../redux/selectors/authSelectors';
import './Header.scss';
import Button from '../../Button';
import { authActionCreators } from '../../../redux/actions/authActionCreators';
import Input from '../../Input';
import { blogsActionCreators } from '../../../redux/actions/blogsActionCreators';
import { newsActionCreators } from '../../../redux/actions/newsActionCreators';

const Header = () => {
	const { username } = useAppSelector(dataAuthSelector);
	const isAuth = useAppSelector(isAuthAuthSelector);
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState<boolean>(false);
	const onClickOpen = useCallback(() => setOpen(true), []);
	const onClickClose = useCallback(() => setOpen(false), []);

	const [searchForm, setSearchForm] = useState({ searchText: '' })

	const onLogout = useCallback(() => {
		dispatch(authActionCreators.logout());
	}, [dispatch]);

	const onSearchTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchForm(prevState => ({ ...prevState, [e.target.id]: e.target.value }))
	}, []);
	return (
		<>
			<header className='header'>
				<div className='header-container'>
					<div className='header-container-logo'></div>
					<div className='header-container-wrap'>
						{isAuth ?
							<>								
								{open ? (
									<form onSubmit={(e) => {
										e.preventDefault();
										dispatch(blogsActionCreators.getBlogsWithFilter(searchForm.searchText));
										dispatch(newsActionCreators.getNewsWithFilter(searchForm.searchText));
									}}>									
										<Input className='s1-p' value={searchForm.searchText} fieldName='searchText' placeholder='Search...' onChange={onSearchTextChange} />
										<div className='close-input-search' onClick={onClickClose}></div>
									</form>
								) : (
									<div className='header-container-wrap-search' onClick={onClickOpen}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
								)}								
								<div className='header-container-wrap-username'>{username}</div>
								<Button onClick={onLogout} className='logout' text='Logout' />
							</>
						: null}
					</div>
				</div>
			</header>
		</>
	)
};

export default React.memo(Header);
import React, { useCallback } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { dataAuthSelector, isAuthAuthSelector } from '../../../redux/selectors/authSelectors';
import './Header.scss';
import Button from '../../Button';
import { authActionCreators } from '../../../redux/actions/authActionCreators';

const Header = () => {
	const { username } = useAppSelector(dataAuthSelector);
	const isAuth = useAppSelector(isAuthAuthSelector);
	const dispatch = useAppDispatch();

	const onLogout = useCallback(() => {
		dispatch(authActionCreators.logout());
	}, [dispatch]);

	return (
		<>
			<header className='header'>
				<div className='header-container'>
					<div className='header-container-logo'></div>
					<div className='header-container-wrap'>
						{isAuth ?
							<>
								<div className='header-container-wrap-search'><FontAwesomeIcon icon={ faMagnifyingGlass } /></div>
								<div className='header-container-wrap-username'>{username}</div>
								<Button onClick={onLogout} className='logout' text='Logout' />
							</>
						: <div></div>}
					</div>
				</div>
			</header>
		</>
	)
};

export default Header;

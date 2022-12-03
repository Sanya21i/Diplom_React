import React from 'react';
import './Footer.scss';

const Footer = () => {
	return (
		<>
			<footer className='footer'>
				<div className='footer-container'>
					<div className='footer-container-wrap'>
						<div className='footer-container-wrap-text'>
							<p>&copy;2022 Blogolog</p>
						</div>
						<div className='footer-container-wrap-switcher'>Switch</div>
					</div>
				</div>
			</footer>		
		</>
	)
};

export default React.memo(Footer);
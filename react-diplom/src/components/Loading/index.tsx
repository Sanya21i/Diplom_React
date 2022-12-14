import React from 'react';
import './Loading.scss';

const Loading = () => {
	return (
		<>
			<div className='loader'>
				<div className='loader-inner'>
					<div className='loader-line-wrap'>
						<div className='loader-line'></div>
					</div>
					<div className='loader-line-wrap'>
						<div className='loader-line'></div>
					</div>
					<div className='loader-line-wrap'>
						<div className='loader-line'></div>
					</div>
					<div className='loader-line-wrap'>
						<div className='loader-line'></div>
					</div>
					<div className='loader-line-wrap'>
						<div className='loader-line'></div>
					</div>
				</div>
			</div>
		</>		
	)	
};

export default React.memo(Loading);
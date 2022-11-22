import React from 'react';
import { TailSpin } from 'react-loader-spinner'

const Preloader = () => {
	return (
		<div>
			<TailSpin height="80"
			width="80"
			radius="9"
			color="green"
			ariaLabel="loading"
		/></div>
	)	
};

export default Preloader;
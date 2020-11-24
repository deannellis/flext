import React from 'react';

const AppFooter = () => {
	return (
		<footer className="app-footer">
			<p>
				©<a href="http://deannellis.me/">Dean Nellis</a>{' '}
				{new Date().getFullYear()}
			</p>
		</footer>
	);
};

export default AppFooter;

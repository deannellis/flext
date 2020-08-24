import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<div className="not-found-page">
			<div className="card">
				<h1>Sorry, we couldn&apos;t find that page...</h1>
				<Link to="/home">Head back home</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startLogin } from '../actions/auth';
import Button from '../components/Button';

const LoginPage = ({ startLogin }) => {
	return (
		<div className="landing-page">
			<div className="landing-page__hero">
				<div>
					<h1>flext takes the guess work out of weight lifting!</h1>
					<Button clickHandler={startLogin()}>
						<img
							src="./images/64px-Google__G__Logo.webp"
							alt="Google mark"
							height="32px"
						/>
						Log in with Google
					</Button>
				</div>
				<div className="landing-page__hero-image">
					<img
						src="./images/landingIllustration.png"
						alt="illustration of weightlifter"
					/>
				</div>
			</div>
			{/* <h1>Welcome to Flext</h1>
			<Button clickHandler={startLogin()}>Login to Flext</Button>
			<button>
				<Link to="/home">To home</Link>
			</button> */}
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startLogin } from '../actions/auth';
import Button from '../components/Button';

const LoginPage = ({ startLogin }) => {
	return (
		<>
			<h1>Welcome to Flext</h1>
			<Button clickHandler={startLogin()}>Login to Flext</Button>
			<button>
				<Link to="/home">To home</Link>
			</button>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

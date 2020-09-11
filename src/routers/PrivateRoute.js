import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
	isAuthenticated,
	component: Component,
	...rest
}) => (
	/* eslint-disable react/jsx-props-no-spreading */
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
		}
	/>
	/* eslint-ensable react/jsx-props-no-spreading */
);
PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.elementType.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PrivateRoute);

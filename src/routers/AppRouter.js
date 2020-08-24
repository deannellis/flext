import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import WorkoutRouter from './WorkoutRouter';
import HomePage from '../pages/HomePage';
import WorkoutsPage from '../pages/WorkoutsPage';
import LiftsPage from '../pages/LiftsPage';
import OnboardingPage from '../pages/OnboardingPage';
import LoginPage from '../pages/LoginPage';
import AppHeader from '../components/AppHeader';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../pages/NotFoundPage';

export const history = createHistory();

const AppRouter = ({ toggleMenu, pageHasMenu }) => (
	<Router history={history}>
		<div>
			<AppHeader toggleMenu={toggleMenu} pageHasMenu={pageHasMenu} />
			<Switch>
				<Route exact path="/" component={LoginPage} />
				<PrivateRoute path="/home" component={HomePage} />
				<PrivateRoute path="/onboarding" component={OnboardingPage} />
				<PrivateRoute path="/workout" component={WorkoutRouter} />
				<PrivateRoute path="/workouts/:id" component={WorkoutsPage} />
				<PrivateRoute path="/workouts" component={WorkoutsPage} />
				<PrivateRoute path="/lifts" component={LiftsPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);
AppRouter.propTypes = {
	toggleMenu: PropTypes.func.isRequired,
	pageHasMenu: PropTypes.bool,
};
AppRouter.defaultProps = {
	pageHasMenu: true,
};

export default AppRouter;

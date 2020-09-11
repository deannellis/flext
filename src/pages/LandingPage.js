import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { startLogin } from '../actions/auth';
import Button from '../components/Button';
import AppFooter from '../components/AppFooter';
import MenuContext from '../context/menu-context';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { setPageMenu } = this.context;
		setPageMenu(false);
	}

	componentWillUnmount() {
		const { setPageMenu } = this.context;
		setPageMenu(true);
	}

	render() {
		const { onStartLogin } = this.props;
		return (
			<div className="landing-page">
				<div className="landing-page__hero">
					<div>
						<h1>flext takes the guess work out of weight lifting</h1>
						<Button clickHandler={onStartLogin()}>
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
				<div className="landing-page__section-2">
					<div>
						<img
							src="./images/workoutComponents.png"
							alt="Components from within the application"
						/>
					</div>
					<div>
						<h1>
							flext knows what your next workout looks like so you don&apos;t
							have to
						</h1>
					</div>
				</div>
				<div className="landing-page__section-3">
					<div>
						<h1>See your gains increase as you progress</h1>
					</div>
					<div>
						<img
							src="./images/weightGraph.png"
							alt="Components from within the application"
						/>
					</div>
				</div>
				<div className="landing-page__section-4">
					<div>
						<img
							src="./images/macroComponent.png"
							alt="Components from within the application"
						/>
					</div>
					<div>
						<h1>Track your macros to optimize your gains</h1>
					</div>
				</div>
				<AppFooter />
			</div>
		);
	}
}
LandingPage.contextType = MenuContext;
LandingPage.propTypes = {
	onStartLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	onStartLogin: () => dispatch(startLogin),
});

export default connect(undefined, mapDispatchToProps)(LandingPage);

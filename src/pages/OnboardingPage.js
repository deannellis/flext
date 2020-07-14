import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setMasterWeights } from '../actions/masterWeights';
import OnboardingCard from '../components/OnboardingCard';
import { MenuContext } from '../context/menu-context';

export class OnboardingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.context.setPageMenu(false);
		const { masterWeights, history } = this.props;
		if (
			Object.entries(masterWeights).length !== 0 &&
			masterWeights.constructor === Object
		) {
			history.push('/home');
		}
	}

	componentWillUnmount() {
		this.context.setPageMenu(true);
	}

	onMasterWeightsSubmit = masterWeights => {
		const { history, onMasterWeightsSubmit } = this.props;
		onMasterWeightsSubmit(masterWeights);
		history.push('/home');
	};

	render() {
		return (
			<div className="onboarding-page__wrapper">
				<div className="card">
					<OnboardingCard onSubmit={this.onMasterWeightsSubmit} />
				</div>
			</div>
		);
	}
}
OnboardingPage.contextType = MenuContext;
OnboardingPage.propTypes = {
	masterWeights: PropTypes.objectOf(PropTypes.any),
	history: PropTypes.shape({
		push: PropTypes.func
	}).isRequired,
	onMasterWeightsSubmit: PropTypes.func.isRequired
};
OnboardingPage.defaultProps = {
	masterWeights: {}
};

const mapStateToProps = state => {
	return {
		masterWeights: state.masterWeights
	};
};
const mapDispatchToProps = dispatch => ({
	onMasterWeightsSubmit: masterWeights =>
		dispatch(setMasterWeights(masterWeights))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(OnboardingPage)
);

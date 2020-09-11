import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { startSetMasterWeights } from '../actions/masterWeights';
import { startSyncLiftVariant } from '../actions/liftVariant';
import OnboardingCard from '../components/OnboardingCard';
import MenuContext from '../context/menu-context';

export class OnboardingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { setPageMenu } = this.context;
		setPageMenu(false);
		const { history } = this.props;
		let { masterWeights } = this.props;
		if (masterWeights === null) masterWeights = {};
		if (
			Object.entries(masterWeights).length !== 0 &&
			masterWeights.constructor === Object
		) {
			history.push('/home');
		}
	}

	componentWillUnmount() {
		const { setPageMenu } = this.context;
		setPageMenu(true);
	}

	onMasterWeightsSubmit = async (masterWeights) => {
		const { history, onMasterWeightsSubmit, onSyncLiftVariant } = this.props;
		onMasterWeightsSubmit(masterWeights);
		await onSyncLiftVariant();
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
		push: PropTypes.func,
	}).isRequired,
	onMasterWeightsSubmit: PropTypes.func.isRequired,
	onSyncLiftVariant: PropTypes.func.isRequired,
};
OnboardingPage.defaultProps = {
	masterWeights: {},
};

const mapStateToProps = (state) => {
	return {
		masterWeights: state.masterWeights,
	};
};
const mapDispatchToProps = (dispatch) => ({
	onMasterWeightsSubmit: (masterWeights) =>
		dispatch(startSetMasterWeights(masterWeights)),
	onSyncLiftVariant: () => dispatch(startSyncLiftVariant()),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(OnboardingPage)
);

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setMasterWeights } from "../actions/masterWeights";
import OnboardingCard from "../components/OnboardingCard";
import { MenuContext } from "../context/menu-context";

export class OnboardingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onMasterWeightsSubmit = masterWeights => {
		// this.props.dispatch(setMasterWeights(masterWeights));
		this.props.onMasterWeightsSubmit(masterWeights);
		this.props.history.push("/home");
	};

	componentDidMount() {
		this.context.setPageMenu(false);
		if (
			Object.entries(this.props.masterWeights).length !== 0 &&
			this.props.masterWeights.constructor === Object
		) {
			this.props.history.push("/home");
		}
	}

	componentWillUnmount() {
		this.context.setPageMenu(true);
	}

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

import React, { Component } from "react";

import ChinupForm from '../forms/OnboardingChinupForm';
import WeightsForm from '../forms/OnboardingWeightsForm';

class StartingWeightForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weights: null,
			chinups: null
		};
	}

	submitWeights = weights => {
		const masterWeights = {
			...weights,
			chinups: this.state.chinups
		};
		this.props.onSubmit(masterWeights);
	};

	submitChinups = chinups => {
		this.setState({
			chinups
		});
	};

	render() {
		return (
			<>
				{this.state.chinups === null ? (
					<ChinupForm submitChinups={this.submitChinups} />
				) : (
					<WeightsForm submitWeights={this.submitWeights} />
				)}
			</>
		);
	}
}

export default StartingWeightForm;


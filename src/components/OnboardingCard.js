import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChinupForm from '../forms/OnboardingChinupForm';
import WeightsForm from '../forms/OnboardingWeightsForm';

class OnboardingCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chinups: null,
		};
	}

	submitWeights = (weights) => {
		const { chinups } = this.state;
		const { onSubmit } = this.props;
		const masterWeights = {
			...weights,
			chinups,
		};
		onSubmit(masterWeights);
	};

	submitChinups = (chinups) => {
		this.setState({
			chinups,
		});
	};

	render() {
		const { chinups } = this.state;
		return (
			<>
				{chinups === null ? (
					<ChinupForm submitChinups={this.submitChinups} />
				) : (
					<WeightsForm submitWeights={this.submitWeights} />
				)}
			</>
		);
	}
}
OnboardingCard.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default OnboardingCard;

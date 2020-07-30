import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

import { OnboardingPage } from '../../pages/OnboardingPage';
import { weights } from '../fixtures/workout';

OnboardingPage.contextTypes = {
	setPageMenu: PropTypes.func,
};
const context = { setPageMenu: () => {} };

const defaultHistory = {
	push: () => {},
	goBack: () => {},
};
const defaultOnMasterWeightsSubmit = () => {};

test('should render the Onboarding Page with required props', () => {
	const wrapper = shallow(
		<OnboardingPage
			history={defaultHistory}
			onMasterWeightsSubmit={defaultOnMasterWeightsSubmit}
		/>,
		{ context }
	);
	expect(wrapper).toMatchSnapshot();
});

test('should route user to homepage if masterweights is not an empty object', () => {
	const history = { push: jest.fn() };
	const wrapper = shallow(
		<OnboardingPage
			masterWeights={weights}
			history={history}
			onMasterWeightsSubmit={defaultOnMasterWeightsSubmit}
		/>,
		{ context }
	);

	expect(history.push).toHaveBeenCalledWith('/home');
});

test('should handle onMasterWeightsSubmit', () => {
	const onMasterWeightsSubmit = jest.fn();
	const history = { push: jest.fn() };
	const wrapper = shallow(
		<OnboardingPage
			onMasterWeightsSubmit={onMasterWeightsSubmit}
			history={history}
		/>,
		{ context }
	);

	wrapper.find('OnboardingCard').prop('onSubmit')(weights);

	expect(onMasterWeightsSubmit).toHaveBeenCalledWith(weights);
	expect(history.push).toHaveBeenCalledWith('/home');
});

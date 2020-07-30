import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

import { LiftPage } from '../../pages/LiftPage';
import { weights, workouts } from '../fixtures/workout';

LiftPage.contextTypes = {
	setPageMenu: PropTypes.func,
};
const context = { setPageMenu: () => {} };

const dispatch = () => {};
const history = {
	push: () => {},
	goBack: () => {},
};

test('should render Lift Page without required props', () => {
	const wrapper = shallow(<LiftPage history={history} dispatch={dispatch} />, {
		context,
	});
	expect(wrapper).toMatchSnapshot();
});

test('should render Lift Page with props', () => {
	// const value = {
	// 	menuIsOpen: false,
	// 	toggleMenu: () => {},
	// 	pageHasMenu: true,
	// 	setPageMenu: () => {},
	// };

	const wrapper = shallow(
		<LiftPage
			workouts={workouts}
			masterWeights={weights}
			match={{ params: { id: 'row' } }}
			history={history}
			dispatch={dispatch}
		/>,
		{ context }
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render Lift Page with chinups', () => {
	// const value = {
	// 	menuIsOpen: false,
	// 	toggleMenu: () => {},
	// 	pageHasMenu: true,
	// 	setPageMenu: () => {},
	// };

	const wrapper = shallow(
		<LiftPage
			workouts={workouts}
			masterWeights={weights}
			match={{ params: { id: 'chinup' } }}
			history={history}
			dispatch={dispatch}
		/>,
		{ context }
	);
	expect(wrapper).toMatchSnapshot();
});

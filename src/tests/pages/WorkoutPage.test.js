import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

import { WorkoutPage } from '../../pages/WorkoutPage';
import { workouts, weights } from '../fixtures/workout';

// if (WorkoutPage) {
// 	console.log('imported!!!', WorkoutPage);
// } else {
// 	console.log('wut!?!?!');
// }
// // Stumped on error

WorkoutPage.contextTypes = {
	setPageMenu: PropTypes.func,
};
const context = { setPageMenu: () => {} };
const dispatch = () => {};
const history = {
	push: () => {},
	goBack: () => {},
};

test('should render WorkoutPage without props', () => {
	const wrapper = shallow(
		<WorkoutPage history={history} dispatch={dispatch} />,
		{ context }
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render WorkoutPage with props', () => {
	const inProgressWorkout = { bench: 2, row: 2, squat: 2 };
	const wrapper = shallow(
		<WorkoutPage
			workouts={workouts}
			masterWeights={weights}
			liftVariant={{ a: 1, b: 1 }}
			inProgressWorkout={inProgressWorkout}
			history={history}
			dispatch={dispatch}
		/>,
		{ context }
	);
	expect(wrapper).toMatchSnapshot();
});

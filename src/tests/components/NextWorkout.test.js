import React from 'react';
import { shallow } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';

import NextWorkout from '../../components/NextWorkout';
import { weights } from '../fixtures/workout';

const defaultOnStartWorkout = () => {};

test('should render NextWorkout with required props', () => {
	const wrapper = shallow(
		<NextWorkout onStartWorkout={defaultOnStartWorkout} />
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render NextWorkout with props', () => {
	const wrapper = shallow(
		<NextWorkout
			liftVariant={{ a: 1, b: 1 }}
			masterWeights={weights}
			onStartWorkout={defaultOnStartWorkout}
		/>
	);
	const wrapperAlt = shallow(
		<NextWorkout
			liftVariant={{ a: 0, b: 2 }}
			masterWeights={weights}
			onStartWorkout={defaultOnStartWorkout}
		/>
	);

	expect(wrapper).toMatchSnapshot();
	expect(wrapperAlt).toMatchSnapshot();
});

test('should handle onStartWorkout', () => {
	const onStartWorkout = jest.fn();
	const { getByText } = render(<NextWorkout onStartWorkout={onStartWorkout} />);
	const startWorkoutButton = getByText('start workout');

	fireEvent.click(startWorkoutButton);
	expect(onStartWorkout).toHaveBeenCalled();
});

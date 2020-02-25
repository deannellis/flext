import React from 'react';
import { shallow } from 'enzyme';
import { render, fireEvent, wait } from '@testing-library/react';

import NextWorkout from '../../components/NextWorkout';
import { weights } from '../fixtures/workout';

test('should render NextWorkout without props', () => {
    const wrapper = shallow(<NextWorkout />);
    expect(wrapper).toMatchSnapshot();
});

test('should render NextWorkout with props', () => {
    const wrapper = shallow(<NextWorkout 
        liftVariant={{ a: 1, b: 1 }} 
        masterWeights={weights}
    />);
    const wrapperAlt = shallow(<NextWorkout 
        liftVariant={{ a: 0, b: 2 }} 
        masterWeights={weights}
    />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapperAlt).toMatchSnapshot();
});

test('should handle onStartWorkout', () => {
	const onStartWorkout = jest.fn();
	const { container, getByText } = render( <NextWorkout onStartWorkout={onStartWorkout } />);
	const startWorkoutButton = getByText("start workout");

	fireEvent.click(startWorkoutButton);
	expect(onStartWorkout).toHaveBeenCalled();
});


import React from 'react';
import { shallow } from 'enzyme';

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
    expect(wrapper).toMatchSnapshot();
});
import React from 'react';
import { shallow } from 'enzyme';

import Calendar from '../../components/Calendar';
import { workouts } from '../fixtures/workout';

test('should render Calendar without props', () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Calendar with props', () => {
    const wrapper = shallow(<Calendar workouts={workouts} />);
    expect(wrapper).toMatchSnapshot();
});
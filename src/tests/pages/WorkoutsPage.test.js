import React from 'react';
import { shallow } from 'enzyme';

import { WorkoutsPage } from '../../pages/WorkoutsPage';
import { workouts } from '../fixtures/workout';

test('should render Workouts Page without props', () => {
    const error = console.error;
    console.error = jest.fn();

    const wrapper = shallow(<WorkoutsPage />);
    expect(wrapper).toMatchSnapshot();

    console.error = error;
});

test('should render Workouts Page with props', () => {
    const error = console.error;
    console.error = jest.fn();
    
    const wrapper = shallow(<WorkoutsPage 
        workouts={workouts}
        liftVariant={{ a:1, b:1 }}
    />);
    expect(wrapper).toMatchSnapshot();

    console.error = error;
});

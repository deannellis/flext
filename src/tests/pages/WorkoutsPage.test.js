import React from 'react';
import { shallow } from 'enzyme';

import { WorkoutsPage } from '../../pages/WorkoutsPage';
import { workouts } from '../fixtures/workout';

beforeEach(() => {
    // Silencing error due to moduleNameMapper for react spring in jest.config.json
    console.error = jest.fn();
});

afterEach(() => {
    const error = console.error;
    console.error = error;
});

test('should render Workouts Page without props', () => {
    const wrapper = shallow(<WorkoutsPage />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Workouts Page with props', () => {
    const wrapper = shallow(<WorkoutsPage 
        workouts={workouts}
        liftVariant={{ a:1, b:1 }}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle onStartWorkout', () => {
    const onStartWorkout = jest.fn();
    const history = { push: jest.fn() };
    const liftVariant = { a: 1, b: 0 };
    const wrapper = shallow(<WorkoutsPage 
        onStartWorkout={onStartWorkout}
        history={history}
        liftVariant={liftVariant}
    />);
    wrapper.find('Button').prop('clickHandler')();
    expect(onStartWorkout).toHaveBeenLastCalledWith(liftVariant);
});

import React from 'react';
import { shallow } from 'enzyme';

import { LiftsPage } from '../../pages/LiftsPage';
import { weights, workouts } from '../fixtures/workout';

test('should render LiftsPage without props', () => {
    const wrapper = shallow(<LiftsPage />);
    expect(wrapper).toMatchSnapshot();
});

test('should render LiftsPage with props', () => {
    const wrapper = shallow(<LiftsPage 
        match={{ path: '/lifts' }}
        masterWeights={weights}  
        workouts={workouts}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle updateLiftWeight', () => {
    const updateLiftWeight = jest.fn();
    const update = { bench: 83 };
    const wrapper = shallow(<LiftsPage updateLiftWeight={updateLiftWeight} />);
    wrapper.find('LiftCard').prop('updateWeight')(update);
    expect(updateLiftWeight).toHaveBeenLastCalledWith(update);
});

import React from 'react';
import { shallow } from 'enzyme';

import LiftCard from '../../components/LiftCard';
import { weights } from '../fixtures/workout';

test('should render Lift Card without props', () => {
    const wrapper = shallow(<LiftCard />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Lift Card with props', () => {
    const weightsProp = weights;
    const wrapper = shallow(<LiftCard 
        lift="row" 
        weights={weightsProp}
        formIsOpen={true}
    />);
    expect(wrapper).toMatchSnapshot();
});
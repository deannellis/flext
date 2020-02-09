import React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from '../../pages/HomePage';
import { weights, workouts } from '../fixtures/workout';
import { macros } from '../fixtures/macros';

test('should render Home Page without props', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Home Page with props', () => {
    const wrapper = shallow(<HomePage 
        masterWeights={weights}  
        liftVariant={{ a:1, b:1 }}
        workouts={workouts}
        macros={macros}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Home Page with welcome message', () => {
    const wrapper = shallow(<HomePage 
        masterWeights={{}}  
        liftVariant={{ a:0, b:0 }}
        workouts={[]}
        macros={macros}
    />);
    expect(wrapper).toMatchSnapshot();
});

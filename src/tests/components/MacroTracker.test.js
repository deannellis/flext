import React from 'react';
import { shallow } from 'enzyme';

import MacroTracker from '../../components/MacroTracker';
import { macros } from '../fixtures/macros';

test('should render Macro Tracker without props', () => {
    const wrapper = shallow(<MacroTracker />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Macro Tracker with props', () => {
    const wrapper = shallow(<MacroTracker macros={macros} />);
    expect(wrapper).toMatchSnapshot();
});
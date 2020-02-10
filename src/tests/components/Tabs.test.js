import React from 'react';
import { shallow } from 'enzyme';

import Tabs from '../../components/Tabs';
import { weights } from '../fixtures/workout';

test('should render Tabs without props', () => {
    const wrapper = shallow(<Tabs />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Tabs with props', () => {
    const labels = Object.keys(weights);
    delete labels.chinup;
    const wrapper = shallow(<Tabs labels={labels} activeIndex={1} />);
    expect(wrapper).toMatchSnapshot();
});

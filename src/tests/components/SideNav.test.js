import React from 'react';
import { shallow } from 'enzyme';

import SideNav from '../../components/SideNav';

test('should render SideNav without props', () => {
    const wrapper = shallow(<SideNav />);
    expect(wrapper).toMatchSnapshot();
});

test('should render SideNav with props', () => {
    const wrapper = shallow(<SideNav path="/home" />);
    expect(wrapper).toMatchSnapshot();
});

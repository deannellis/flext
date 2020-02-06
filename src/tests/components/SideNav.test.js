import React from 'react';
import { shallow } from 'enzyme';

import SideNav from '../../components/SideNav';

test('should render SideNav', () => {
    const wrapper = shallow(<SideNav />);
    expect(wrapper).toMatchSnapshot();
});

// test('should render SideNav', () => {});

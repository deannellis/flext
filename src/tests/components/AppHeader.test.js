import React from 'react';
import { shallow } from 'enzyme';

import AppHeader from '../../components/AppHeader';

test('should render App Header without props', () => {
    const wrapper = shallow(<AppHeader />);
    expect(wrapper).toMatchSnapshot();
});

test('should render App Header with props', () => {
    const wrapper = shallow(<AppHeader pageHasMenu={true} toggleMenu={() => {}} />);
    expect(wrapper).toMatchSnapshot();
});
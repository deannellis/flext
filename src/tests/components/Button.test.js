import React from 'react';
import { shallow } from 'enzyme';

import Button from '../../components/Button';

test('should render Button without props', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Button with props', () => {
    const wrapper = shallow(<Button variant="primary" disabled="true" type="submit" >Button</Button>);
    expect(wrapper).toMatchSnapshot();
});
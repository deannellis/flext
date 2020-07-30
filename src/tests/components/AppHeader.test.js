import React from 'react';
import { shallow } from 'enzyme';

import AppHeader from '../../components/AppHeader';

test('should render App Header with props', () => {
	const wrapper = shallow(<AppHeader pageHasMenu toggleMenu={() => {}} />);
	expect(wrapper).toMatchSnapshot();
});

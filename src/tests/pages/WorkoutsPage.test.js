import React from 'react';
import { shallow } from 'enzyme';

import { WorkoutsPage } from '../../pages/WorkoutsPage';

test('should render Workouts Page without props', () => {
    const wrapper = shallow(<WorkoutsPage />);
    expect(wrapper).toMatchSnapshot();
});

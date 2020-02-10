import React from 'react';
import { shallow } from 'enzyme';

import StartingWeightForm from '../../components/StartingWeightForm';

test('should render Starting Weight Form without props', () => {
    const wrapper = shallow(<StartingWeightForm />);
    expect(wrapper).toMatchSnapshot();
});
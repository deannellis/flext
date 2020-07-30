import React from 'react';
import { shallow } from 'enzyme';
import OnboardingCard from '../../components/OnboardingCard';

const defaultOnSubmit = () => {};

test('should render Starting Weight Form with required props', () => {
	const wrapper = shallow(<OnboardingCard onSubmit={defaultOnSubmit} />);
	expect(wrapper).toMatchSnapshot();
});

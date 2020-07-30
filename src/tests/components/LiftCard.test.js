import React from 'react';
import { shallow } from 'enzyme';

import LiftCard from '../../components/LiftCard';
import { weights } from '../fixtures/workout';

const defaultToggleForm = () => {};
const defaultUpdateWeight = () => {};

test('should render Lift Card with required props', () => {
	const wrapper = shallow(
		<LiftCard
			toggleForm={defaultToggleForm}
			updateWeight={defaultUpdateWeight}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render Lift Card with props', () => {
	const weightsProp = weights;
	const wrapper = shallow(
		<LiftCard
			lift="row"
			weights={weightsProp}
			formIsOpen
			toggleForm={defaultToggleForm}
			updateWeight={defaultUpdateWeight}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

test('should open update weight form', () => {
	const toggleForm = jest.fn();
	const wrapper = shallow(
		<LiftCard toggleForm={toggleForm} updateWeight={defaultUpdateWeight} />
	);

	wrapper.find('Button').prop('clickHandler')();

	expect(toggleForm).toHaveBeenCalled();
});

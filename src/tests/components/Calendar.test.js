import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import Calendar from '../../components/Calendar';
import { workouts } from '../fixtures/workout';

const defaultOnClickWorkoutDate = () => {};

test('should render Calendar without props', () => {
	const wrapper = shallow(
		<Calendar onClickWorkoutDate={defaultOnClickWorkoutDate} />
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render Calendar with props', () => {
	const wrapper = shallow(
		<Calendar
			workouts={workouts}
			onClickWorkoutDate={defaultOnClickWorkoutDate}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

test('should increment month', () => {
	const wrapper = shallow(
		<Calendar onClickWorkoutDate={defaultOnClickWorkoutDate} />
	);
	const startDate = moment(wrapper.state('dateObject'));

	wrapper.find('.calendar__prev-month').simulate('click');

	const prevClickedDate = moment(wrapper.state('dateObject'));

	expect(startDate.diff(prevClickedDate, 'months')).toBe(1);
	expect(startDate.isAfter(prevClickedDate)).toBe(true);
});

test('should decrement month', () => {
	const wrapper = shallow(
		<Calendar onClickWorkoutDate={defaultOnClickWorkoutDate} />
	);
	const startDate = moment(wrapper.state('dateObject'));

	wrapper.find('.calendar__next-month').simulate('click');

	const nextClickedDate = moment(wrapper.state('dateObject'));

	expect(startDate.diff(nextClickedDate, 'months')).toBe(-1);
	expect(startDate.isAfter(nextClickedDate)).toBe(false);
});

test('should link to workout by date', () => {
	const onClickWorkoutDate = jest.fn();
	const wrapper = shallow(
		<Calendar onClickWorkoutDate={onClickWorkoutDate} workouts={workouts} />
	);

	wrapper.find('.calendar__day--worked-out').simulate('click');
	expect(onClickWorkoutDate).toHaveBeenCalledWith(
		'1d8ad17a-c62a-4182-8ddb-0df62af33c65'
	);
});

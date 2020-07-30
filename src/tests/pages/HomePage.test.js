import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

import { HomePage } from '../../pages/HomePage';
import { weights, workouts } from '../fixtures/workout';
import { macros } from '../fixtures/macros';

const defaultHistory = {
	push: () => {},
	goBack: () => {},
};
const defaultOnStartWorkout = () => {};
const defaultOnSetMacros = () => {};
const defaultOnUpdateMacro = () => {};
const defaultOnResetCurrentMacros = () => {};

test('should render Home Page with required props', () => {
	const wrapper = shallow(
		<HomePage
			history={defaultHistory}
			onStartWorkout={defaultOnStartWorkout}
			onSetMacros={defaultOnSetMacros}
			onUpdateMacro={defaultOnUpdateMacro}
			onResetCurrentMacros={defaultOnResetCurrentMacros}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render Home Page with props', () => {
	const wrapper = shallow(
		<HomePage
			masterWeights={weights}
			liftVariant={{ a: 1, b: 1 }}
			workouts={workouts}
			macros={macros}
			onStartWorkout={defaultOnStartWorkout}
			onSetMacros={defaultOnSetMacros}
			onUpdateMacro={defaultOnUpdateMacro}
			onResetCurrentMacros={defaultOnResetCurrentMacros}
			history={defaultHistory}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render Home Page with welcome message', () => {
	HomePage.contextTypes = {
		setPageMenu: PropTypes.func,
	};
	const context = { setPageMenu: () => {} };
	const wrapper = shallow(
		<HomePage
			masterWeights={{}}
			liftVariant={{ a: 0, b: 0 }}
			workouts={[]}
			macros={macros}
			history={defaultHistory}
			onStartWorkout={defaultOnStartWorkout}
			onSetMacros={defaultOnSetMacros}
			onUpdateMacro={defaultOnUpdateMacro}
			onResetCurrentMacros={defaultOnResetCurrentMacros}
		/>,
		{ context }
	);
	expect(wrapper).toMatchSnapshot();
});

test('should handle onStartWorkout', () => {
	const onStartWorkout = jest.fn();
	const history = { push: jest.fn() };
	const liftVariant = { a: 1, b: 0 };
	const wrapper = shallow(
		<HomePage
			onStartWorkout={onStartWorkout}
			history={history}
			liftVariant={liftVariant}
			onSetMacros={defaultOnSetMacros}
			onUpdateMacro={defaultOnUpdateMacro}
			onResetCurrentMacros={defaultOnResetCurrentMacros}
		/>
	);
	wrapper.find('NextWorkout').prop('onStartWorkout')();
	expect(history.push).toHaveBeenLastCalledWith('/workout');
	expect(onStartWorkout).toHaveBeenLastCalledWith(liftVariant);
});

test('should handle onUpdateMacro', () => {
	const onUpdateMacro = jest.fn();
	const update = { macro: 'fat', amount: 11 };
	const wrapper = shallow(
		<HomePage
			onUpdateMacro={onUpdateMacro}
			history={defaultHistory}
			onStartWorkout={defaultOnStartWorkout}
			onSetMacros={defaultOnSetMacros}
			onResetCurrentMacros={defaultOnResetCurrentMacros}
		/>
	);
	wrapper.find('MacroTracker').prop('updateMacro')(update);
	expect(onUpdateMacro).toHaveBeenLastCalledWith(update);
});

test('should handle onSetMacros', () => {
	const onSetMacros = jest.fn();
	const wrapper = shallow(
		<HomePage
			onSetMacros={onSetMacros}
			history={defaultHistory}
			onStartWorkout={defaultOnStartWorkout}
			onUpdateMacro={defaultOnUpdateMacro}
			onResetCurrentMacros={defaultOnResetCurrentMacros}
		/>
	);
	wrapper.find('MacroTracker').prop('setMacros')(macros);
	expect(onSetMacros).toHaveBeenLastCalledWith(macros);
});

test('should handle onClickWorkoutDate', () => {
	const history = { push: jest.fn() };
	const id = 'abc123';
	const wrapper = shallow(
		<HomePage
			history={history}
			onStartWorkout={defaultOnStartWorkout}
			onSetMacros={defaultOnSetMacros}
			onUpdateMacro={defaultOnUpdateMacro}
			onResetCurrentMacros={defaultOnResetCurrentMacros}
		/>
	);
	wrapper.find('Calendar').prop('onClickWorkoutDate')(id);
	expect(history.push).toHaveBeenLastCalledWith(`/workouts/${id}`);
});

import React from 'react';
import { shallow } from 'enzyme';

import MacroTracker from '../../components/MacroTracker';
import { macros } from '../fixtures/macros';

const setMacros = () => {};
const updateMacro = () => {};
const resetMacros = () => {};

test('should render Macro Tracker with required props', () => {
	const wrapper = shallow(
		<MacroTracker
			setMacros={setMacros}
			updateMacro={updateMacro}
			resetMacros={resetMacros}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render Macro Tracker with props', () => {
	const wrapper = shallow(
		<MacroTracker
			macros={macros}
			setMacros={setMacros}
			updateMacro={updateMacro}
			resetMacros={resetMacros}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

// test('should open update form', () => {
//     const wrapper = shallow(<MacroTracker macros={macros} />);
//     wrapper.find('Button').at(0).simulate('click');
//     expect(wrapper.state('displayUpdateForm')).toBe(true);
// });

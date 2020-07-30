import React from 'react';
import { shallow } from 'enzyme';

import Tabs from '../../components/Tabs';
import { weights } from '../fixtures/workout';

const defaultHandleSelect = () => {};

test('should render Tabs with required props', () => {
	const labels = Object.keys(weights);
	delete labels.chinup;
	const wrapper = shallow(
		<Tabs labels={labels} handleSelect={defaultHandleSelect} />
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render Tabs with props', () => {
	const labels = Object.keys(weights);
	delete labels.chinup;
	const wrapper = shallow(
		<Tabs labels={labels} activeIndex={1} handleSelect={defaultHandleSelect} />
	);
	expect(wrapper).toMatchSnapshot();
});

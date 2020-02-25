import React from 'react';
import { shallow } from 'enzyme';
import {  render, fireEvent, wait } from '@testing-library/react';
import SideNav, { navList } from '../../components/SideNav';
import { BrowserRouter as Router } from 'react-router-dom';

test('should render SideNav without props', () => {
    const wrapper = shallow(<SideNav />);
    expect(wrapper).toMatchSnapshot();
});

test('should render SideNav with props', () => {
    const wrapper = shallow(<SideNav path="/home" />);
    expect(wrapper).toMatchSnapshot();
});

test('should render anchor tags with correct paths', () => {
	const { getByTestId } = render(
		<Router>
			<SideNav />
		</Router>
	);
	const paths = navList.map(item => (item.path));
	const { children } = getByTestId('side-nav');
	for(let i = 0; i < navList.length; i++){
		let url = children[i].href;
		expect(url.includes(paths[i])).toBe(true);
	}
});

import { shallow } from "enzyme";
import React from "react";

import {
	HamburgerIcon,
	DumbbellIcon,
	DashboardIcon,
	GraphIcon,
	RightArrowIcon,
	LeftArrowIcon,
	DotsIcon
} from "../../utils/icons";

test("should render hamburger (menu) icon", () => {
	const wrapper = shallow(<HamburgerIcon />);
	expect(wrapper).toMatchSnapshot();
});

test("should render dumbbell icon", () => {
	const wrapper = shallow(<DumbbellIcon />);
	expect(wrapper).toMatchSnapshot();
});

test("should render dashboard icon", () => {
	const wrapper = shallow(<DashboardIcon />);
	expect(wrapper).toMatchSnapshot();
});

test("should render dashboard icon", () => {
	const wrapper = shallow(<DashboardIcon />);
	expect(wrapper).toMatchSnapshot();
});

test("should render graph icon", () => {
	const wrapper = shallow(<GraphIcon />);
	expect(wrapper).toMatchSnapshot();
});

test("should render right arrow icon", () => {
	const wrapper = shallow(<RightArrowIcon />);
	expect(wrapper).toMatchSnapshot();
});

test("should render left arrow icon", () => {
	const wrapper = shallow(<LeftArrowIcon />);
	expect(wrapper).toMatchSnapshot();
});

test("should render dots icon", () => {
	const wrapper = shallow(<DotsIcon />);
	expect(wrapper).toMatchSnapshot();
});

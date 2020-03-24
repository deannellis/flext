import React from "react";
import PropTypes from "prop-types";
import { shallow } from "enzyme";

import { LiftPage } from "../../pages/LiftPage";
import { weights, workouts } from "../fixtures/workout";

LiftPage.contextTypes = {
	setPageMenu: PropTypes.func
};
const context = { setPageMenu: () => {} };

test("should render Lift Page without props", () => {
	const wrapper = shallow(<LiftPage />, { context });
	expect(wrapper).toMatchSnapshot();
});

test("should render Lift Page with props", () => {
	const value = {
		menuIsOpen: false,
		toggleMenu: () => {},
		pageHasMenu: true,
		setPageMenu: () => {}
	};

	const wrapper = shallow(
		<LiftPage
			workouts={workouts}
			masterWeights={weights}
			match={{ params: { id: "row" } }}
		/>,
		{ context }
	);
	expect(wrapper).toMatchSnapshot();
});

test("should render Lift Page with chinups", () => {
	const value = {
		menuIsOpen: false,
		toggleMenu: () => {},
		pageHasMenu: true,
		setPageMenu: () => {}
	};

	const wrapper = shallow(
		<LiftPage
			workouts={workouts}
			masterWeights={weights}
			match={{ params: { id: "chinup" } }}
		/>,
		{ context }
	);
	expect(wrapper).toMatchSnapshot();
});

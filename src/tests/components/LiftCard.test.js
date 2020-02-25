import React from "react";
import { shallow } from "enzyme";

import LiftCard from "../../components/LiftCard";
import { weights } from "../fixtures/workout";

test("should render Lift Card without props", () => {
	const wrapper = shallow(<LiftCard />);
	expect(wrapper).toMatchSnapshot();
});

test("should render Lift Card with props", () => {
	const weightsProp = weights;
	const wrapper = shallow(
		<LiftCard lift="row" weights={weightsProp} formIsOpen={true} />
	);
	expect(wrapper).toMatchSnapshot();
});

test("should open update weight form", () => {
	const toggleForm = jest.fn();
	const wrapper = shallow(<LiftCard toggleForm={toggleForm} />);

	wrapper.find("Button").prop("clickHandler")();

	expect(toggleForm).toHaveBeenCalled();
});

import React from "react";
import PropTypes from "prop-types";
import { shallow } from "enzyme";

import { WorkoutPage } from "../../pages/WorkoutPage";
import { workouts, weights } from "../fixtures/workout";

WorkoutPage.contextTypes = {
	setPageMenu: PropTypes.func
};
const context = { setPageMenu: () => {} };
test("should render WorkoutPage without props", () => {
	const wrapper = shallow(<WorkoutPage />, { context });
	expect(wrapper).toMatchSnapshot();
});

test("should render WorkoutPage with props", () => {
	const inProgressWorkout = { bench: 2, row: 2, squat: 2 };
	const wrapper = shallow(
		<WorkoutPage
			workouts={workouts}
			masterWeights={weights}
			liftVariant={{ a: 1, b: 1 }}
			inProgressWorkout={inProgressWorkout}
		/>,
		{ context }
	);
	expect(wrapper).toMatchSnapshot();
});

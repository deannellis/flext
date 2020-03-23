import React from "react";
import { shallow } from "enzyme";

import OnboardingCard from "../../components/OnboardingCard";

test("should render Starting Weight Form without props", () => {
	const wrapper = shallow(<OnboardingCard />);
	expect(wrapper).toMatchSnapshot();
});


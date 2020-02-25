import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import { UpdateWeightForm } from "../../components/LiftCard";

test("should have validation error given input field is touched and error exists on form", async () => {
	const lift = "row";
	const { container, findByTestId } = render(<UpdateWeightForm lift={lift} />);
	const input = container.querySelector(`input[name=${lift}]`);

	fireEvent.change(input, {
		target: { value: "" }
	});
	fireEvent.blur(input);
	const validationErrors = await findByTestId(`errors-${lift}`);

	expect(validationErrors.innerHTML).toBe("Required");
});

test("should submit correct values on form submit", async () => {
	const lift = "row";
	const newWeight = 88;
	const toggleForm = jest.fn();
	const updateWeight = jest.fn();
	const { getByText, container } = render(
		<UpdateWeightForm
			lift={lift}
			toggleForm={toggleForm}
			updateWeight={updateWeight}
		/>
	);
	const submitButton = getByText("submit");
	const input = container.querySelector(`input[name=${lift}]`);
	fireEvent.change(input, {
		target: { value: newWeight }
	});
	fireEvent.click(submitButton);

	wait(() => {
		expect(updateWeight).toHaveBeenCalledWith(newWeight);
		expect(toggleForm).toHaveBeenCalled();
	});
});

test("should not submit form without required field filled", async () => {
	const lift = "row";
	const onSubmit = jest.fn();
	const { getByText } = render(
		<UpdateWeightForm lift={lift} toggleForm={onSubmit} />
	);
	const submitButton = getByText("submit");

	fireEvent.click(submitButton);

	wait(() => {
		expect(onSubmit).not.toHaveBeenCalled();
	});
});

test("should toggle form on clicking cancel button", () => {
	const toggleForm = jest.fn();
	const updateWeight = jest.fn();
	const { getByText, container } = render(
		<UpdateWeightForm
			lift={"row"}
			toggleForm={toggleForm}
			updateWeight={updateWeight}
		/>
	);
	const cancelButton = getByText("cancel");
	fireEvent.click(cancelButton);
	expect(toggleForm).toHaveBeenCalled();
});

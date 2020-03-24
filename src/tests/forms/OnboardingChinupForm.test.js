import React from "react";
import { act } from "react-dom/test-utils";
import {
	render,
	fireEvent,
	waitForElement,
	wait
} from "@testing-library/react";

import OnboardingChinupForm from "../../forms/OnboardingChinupForm";

test("should submit form when submit button is clicked", async () => {
	const submitChinups = jest.fn();
	const { getByText } = render(
		<OnboardingChinupForm submitChinups={submitChinups} />
	);
	const submitButton = await waitForElement(() => getByText("submit"));

	await wait(() => {
		fireEvent.click(submitButton);
	});

	expect(submitChinups).toHaveBeenCalledWith({
		negatives: 5,
		ups: 0,
		weight: 0
	});
});

test("should autocorrect negatives input if greater than 5", async () => {
	const submitChinups = jest.fn();
	const { getByText, getByDisplayValue } = render(
		<OnboardingChinupForm submitChinups={submitChinups} />
	);
	const submitButton = await waitForElement(() => getByText("submit"));
	const negativesInput = await waitForElement(() => getByDisplayValue("5"));

	await wait(() => {
		fireEvent.change(negativesInput, { target: { value: "69" } });
	});
	await wait(() => {
		fireEvent.click(submitButton);
	});

	expect(submitChinups).toHaveBeenCalledWith({
		negatives: 5,
		ups: 0,
		weight: 0
	});
});

test("decrementing negatives should increment ups", async () => {
	const submitChinups = jest.fn();
	const { getByText, getByDisplayValue } = render(
		<OnboardingChinupForm submitChinups={submitChinups} />
	);
	const submitButton = await waitForElement(() => getByText("submit"));
	const negativesInput = await waitForElement(() => getByDisplayValue("5"));

	await wait(() => {
		fireEvent.change(negativesInput, { target: { value: "4" } });
	});
	await wait(() => {
		fireEvent.click(submitButton);
	});

	expect(submitChinups).toHaveBeenCalledWith({
		negatives: 4,
		ups: 1,
		weight: 0
	});
});

test("incrementing ups should decrement negatives", async () => {
	const submitChinups = jest.fn();
	const { getByText, getAllByDisplayValue } = render(
		<OnboardingChinupForm submitChinups={submitChinups} />
	);
	const submitButton = await waitForElement(() => getByText("submit"));
	const zeroInputs = await waitForElement(() => getAllByDisplayValue("0"));
	const upsInput = zeroInputs[0];

	await wait(() => {
		fireEvent.change(upsInput, { target: { value: "1" } });
	});
	await wait(() => {
		fireEvent.click(submitButton);
	});

	expect(submitChinups).toHaveBeenCalledWith({
		negatives: 4,
		ups: 1,
		weight: 0
	});
});

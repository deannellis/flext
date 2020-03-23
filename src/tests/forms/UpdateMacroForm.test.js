import React from "react";
import {
	render,
	fireEvent,
	waitForElement,
	wait
} from "@testing-library/react";

import UpdateMacroForm from "../../forms/UpdateMacroForm";

test("should display required error given required fields are not filled", async () => {
	const updateMacro = jest.fn();
	const { getByTestId, getByText } = render(
		<UpdateMacroForm updateMacro={updateMacro} />
	);
	const submitButton = await waitForElement(() => getByText("submit"));

	await wait(() => {
		fireEvent.click(submitButton);
	});

	const validationError = await waitForElement(() =>
		getByTestId("errors-macro")
	);

	expect(validationError.innerHTML).toBe("Required");
	expect(updateMacro).not.toHaveBeenCalled();
});

test("should not submit form if amount is less than 0", async () => {
	const updateMacro = jest.fn();
	const { getByText, getByRole } = render(
		<UpdateMacroForm updateMacro={updateMacro} />
	);
	const select = await waitForElement(() => getByRole("listbox"));
	const input = await waitForElement(() => getByRole("textbox"));
	const submitButton = await waitForElement(() => getByText("submit"));

	await wait(() => {
		fireEvent.change(select, { target: { value: "fat" } });
	});
	await wait(() => {
		fireEvent.change(input, { target: { value: "-1" } });
	});
	await wait(() => {
		fireEvent.click(submitButton);
	});

	expect(updateMacro).not.toHaveBeenCalled();
});

test("should submit forms with valid values", async () => {
	const updateMacro = jest.fn();
	const { getByText, getByRole } = render(
		<UpdateMacroForm updateMacro={updateMacro} />
	);
	const select = await waitForElement(() => getByRole("listbox"));
	const input = await waitForElement(() => getByRole("textbox"));
	const submitButton = await waitForElement(() => getByText("submit"));

	await wait(() => {
		fireEvent.change(select, { target: { value: "fat" } });
	});
	await wait(() => {
		fireEvent.change(input, { target: { value: "20" } });
	});
	await wait(() => {
		fireEvent.click(submitButton);
	});

	expect(updateMacro).toHaveBeenCalled();
});

test("clicking cancel should close form", async () => {
	const closeForm = jest.fn();
	const { getByText } = render(<UpdateMacroForm closeForm={closeForm} />);
	const cancelButton = await waitForElement(() => getByText("cancel"));

	await wait(() => {
		fireEvent.click(cancelButton);
	});

	expect(closeForm).toHaveBeenCalled();
});

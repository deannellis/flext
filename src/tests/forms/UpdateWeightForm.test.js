import React from 'react';
import {
	render,
	fireEvent,
	wait,
	waitForElement,
} from '@testing-library/react';

import UpdateWeightForm from '../../forms/UpdateWeightForm';

const currentWeight = 100;
const defaultToggleForm = () => {};
const defaultUpdateWeight = () => {};

test('should have validation error given input field is touched and error exists on form', async () => {
	const lift = 'row';
	const { container, findByTestId } = render(
		<UpdateWeightForm
			lift={lift}
			currentWeight={currentWeight}
			toggleForm={defaultToggleForm}
			updateWeight={defaultUpdateWeight}
		/>
	);
	const input = container.querySelector(`input[name=${lift}]`);

	fireEvent.change(input, {
		target: { value: '' },
	});
	fireEvent.blur(input);
	const validationErrors = await findByTestId(`errors-${lift}`);

	expect(validationErrors.innerHTML).toBe('Required');
});

test('should submit correct values on form submit', async () => {
	const lift = 'row';
	const newWeight = 88;
	const toggleForm = jest.fn();
	const updateWeight = jest.fn();
	const { getByText, container } = render(
		<UpdateWeightForm
			lift={lift}
			toggleForm={toggleForm}
			updateWeight={updateWeight}
			currentWeight={currentWeight}
		/>
	);
	const submitButton = getByText('submit');
	const input = container.querySelector(`input[name=${lift}]`);
	fireEvent.change(input, {
		target: { value: newWeight },
	});
	fireEvent.click(submitButton);

	wait(() => {
		expect(updateWeight).toHaveBeenCalledWith(newWeight);
		expect(toggleForm).toHaveBeenCalled();
	});
});

test('should not submit form without required field filled', async () => {
	const lift = 'row';
	const onSubmit = jest.fn();
	const { getByText } = render(
		<UpdateWeightForm
			lift={lift}
			toggleForm={onSubmit}
			currentWeight={currentWeight}
			updateWeight={defaultUpdateWeight}
		/>
	);
	const submitButton = getByText('submit');

	fireEvent.click(submitButton);

	wait(() => {
		expect(onSubmit).not.toHaveBeenCalled();
	});
});

test('should toggle form on clicking cancel button', () => {
	const toggleForm = jest.fn();
	const updateWeight = jest.fn();
	const { getByText } = render(
		<UpdateWeightForm
			lift="row"
			toggleForm={toggleForm}
			updateWeight={updateWeight}
			currentWeight={currentWeight}
		/>
	);
	const cancelButton = getByText('cancel');
	fireEvent.click(cancelButton);
	expect(toggleForm).toHaveBeenCalled();
});

test('should not submit form if weight is greater than 1000lbs', async () => {
	const lift = 'row';
	const updateWeight = jest.fn();
	const { container, getByText, findByTestId } = render(
		<UpdateWeightForm
			updateWeight={updateWeight}
			lift={lift}
			currentWeight={currentWeight}
			toggleForm={defaultToggleForm}
		/>
	);
	const input = await waitForElement(() =>
		container.querySelector(`input[name="${lift}"]`)
	);
	const submitButton = await waitForElement(() => getByText('submit'));

	await wait(() => {
		fireEvent.change(input, {
			target: { value: '1001' },
		});
	});
	await wait(() => {
		fireEvent.blur(input);
	});
	await wait(() => {
		fireEvent.click(submitButton);
	});

	const validationErrors = await findByTestId(`errors-${lift}`);
	expect(validationErrors.innerHTML).toBe(
		'Weight can not exceed 1000lbs tough guy'
	);
	expect(updateWeight).not.toHaveBeenCalled();
});

test('should not submit form if weight is less than 44lbs', async () => {
	const lift = 'row';
	const updateWeight = jest.fn();
	const { container, getByText, findByTestId } = render(
		<UpdateWeightForm
			updateWeight={updateWeight}
			lift={lift}
			currentWeight={currentWeight}
			toggleForm={defaultToggleForm}
		/>
	);
	const input = await waitForElement(() =>
		container.querySelector(`input[name="${lift}"]`)
	);
	const submitButton = await waitForElement(() => getByText('submit'));

	await wait(() => {
		fireEvent.change(input, {
			target: { value: '43' },
		});
	});
	await wait(() => {
		fireEvent.blur(input);
	});
	await wait(() => {
		fireEvent.click(submitButton);
	});

	const validationErrors = await findByTestId(`errors-${lift}`);
	expect(validationErrors.innerHTML).toBe(
		'Weight must be greater than bar weight'
	);
	expect(updateWeight).not.toHaveBeenCalled();
});

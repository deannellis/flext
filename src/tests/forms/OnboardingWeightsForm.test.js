import React from 'react';
import { act } from 'react-dom/test-utils';
import {
	render,
	fireEvent,
	waitForElement,
	wait,
} from '@testing-library/react';

import OnboardingWeightsForm from '../../forms/OnboardingWeightsForm';

const lifts = ['bench', 'deadlift', 'overhead', 'row', 'squat'];
const defaultSubmitWeights = () => {};
/* eslint-disable no-restricted-syntax */
test('should display required error given input field is touched and looses focus', async () => {
	const { container, findByTestId } = render(
		<OnboardingWeightsForm submitWeights={defaultSubmitWeights} />
	);

	for (const lift of lifts) {
		const input = container.querySelector(`input[name="${lift}"]`);
		fireEvent.change(input, {
			target: { value: '' },
		});
		fireEvent.blur(input);
		const validationErrors = await findByTestId(`errors-${lift}`);
		expect(validationErrors.innerHTML).toBe('Required');
	}
});

test('should not submit form if weight is greater than 1000lbs', async () => {
	const submitWeights = jest.fn();
	const { container, getByText, findByTestId } = render(
		<OnboardingWeightsForm submitWeights={submitWeights} />
	);
	for (let lift of lifts) {
		const input = await waitForElement(() =>
			container.querySelector(`input[name="${lift}"]`)
		);
		const submitButton = await waitForElement(() => getByText('next'));
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
		expect(submitWeights).not.toHaveBeenCalled();
	}
});

test('should submit form with correct values', async () => {
	const submitWeights = jest.fn();
	const { container, getByText } = render(
		<OnboardingWeightsForm submitWeights={submitWeights} />
	);
	const input = await waitForElement(() =>
		container.querySelector('input[name="row"]')
	);
	const submitButton = await waitForElement(() => getByText('next'));
	await wait(() => {
		fireEvent.change(input, {
			target: { value: '69' },
		});
	});
	await wait(() => {
		fireEvent.blur(input);
	});
	await wait(() => {
		fireEvent.click(submitButton);
	});

	expect(submitWeights).toHaveBeenCalledWith({
		bench: 44,
		deadlift: 44,
		overhead: 44,
		row: 69,
		squat: 44,
	});
});

test('should not submit form if weight is less than 44lbs', async () => {
	const submitWeights = jest.fn();
	const { container, getByText, findByTestId } = render(
		<OnboardingWeightsForm submitWeights={submitWeights} />
	);

	for (const lift of lifts) {
		const input = await waitForElement(() =>
			container.querySelector(`input[name="${lift}"]`)
		);
		const submitButton = await waitForElement(() => getByText('next'));
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
			'Weight must be greater than bar weight (44 lbs)'
		);
		expect(submitWeights).not.toHaveBeenCalled();
	}
});
/* eslint-enable no-restricted-syntax */

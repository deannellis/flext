import React from 'react';
import {
	render,
	fireEvent,
	waitForElement,
	wait,
} from '@testing-library/react';

import SetMacrosForm from '../../forms/SetMacrosForm';

const defaultSumbitMacros = () => {};

test('should display required error given input is touched and looses focus', async () => {
	const { container, findByTestId } = render(
		<SetMacrosForm submitMacros={defaultSumbitMacros} />
	);
	const input = container.querySelector('input[name="protein"]');

	fireEvent.change(input, {
		target: { value: '' },
	});
	fireEvent.blur(input);

	const validationError = await findByTestId('errors-protein');
	expect(validationError.innerHTML).toBe('Required');
});

test('should not submit form if macro is less than 0', async () => {
	const submitMacros = jest.fn();
	const { container, getByText } = render(
		<SetMacrosForm submitMacros={submitMacros} />
	);
	const input = await waitForElement(() =>
		container.querySelector('input[name="protein"]')
	);
	const submitButton = await waitForElement(() => getByText('submit'));

	await wait(() => {
		fireEvent.change(input, {
			target: { value: '-1' },
		});
	});
	await wait(() => {
		fireEvent.blur(input);
	});
	await wait(() => {
		fireEvent.click(submitButton);
	});

	expect(submitMacros).not.toHaveBeenCalled();
});

test('should submit form with valid values', async () => {
	const submitMacros = jest.fn();
	const current = {
		protein: 300,
		carbs: 270,
		fat: 80,
	};
	const { getByText } = render(
		<SetMacrosForm submitMacros={submitMacros} current={current} />
	);
	const submitButton = await waitForElement(() => getByText('submit'));

	await wait(() => {
		fireEvent.click(submitButton);
	});

	expect(submitMacros).toHaveBeenCalled();
});

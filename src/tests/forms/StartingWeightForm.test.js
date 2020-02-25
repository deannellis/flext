import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import { WeightsForm } from '../../components/StartingWeightForm';

const lifts = [
    'bench',
    'deadlift',
    'overhead',
    'row',
    'squat'
];

describe('tests for WeightsForm', () => {
    test('should have validation error given input field is touched and error exists on form', async () => {
        const { container, findByTestId } = render(
            <WeightsForm />
        );
        let errors = {}
    
        for(let lift of lifts) {
            const input = container.querySelector(`input[name="${lift}"]`);
            fireEvent.change(input, {
                target: { value: '' }
            });
            fireEvent.blur(input);
            const validationErrors = await findByTestId(`errors-${lift}`);
            expect(validationErrors.innerHTML).toBe('Required');
        }
    });
})
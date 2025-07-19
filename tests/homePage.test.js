import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '../app/page';

describe('HomePage Integration Test', () => {
    it('should correctly enable and disable monthly options based on radio button selection', async () => {
        render(<HomePage />);

        // Wait for the client-side components to render
        await waitFor(() => {
            expect(screen.getByText('Recurring Date Picker')).toBeInTheDocument();
        });

        // 1. Click on the "Monthly" button
        const monthlyButton = screen.getByRole('button', { name: /monthly/i });
        await userEvent.click(monthlyButton);

        // 2. Find the radio buttons and their corresponding inputs/selects
        const onDayRadio = screen.getByLabelText(/on day/i);
        const onTheRadio = screen.getByLabelText(/on the/i);
        
        // FIX: Use getByTestId to uniquely identify the day input.
        const dayInput = screen.getByTestId('monthly-day-input');
        const weekSelect = screen.getAllByRole('combobox')[0];
        const weekdaySelect = screen.getAllByRole('combobox')[1];

        // 3. Initial state check: "On day" is selected by default
        expect(onDayRadio).toBeChecked();
        expect(dayInput).not.toBeDisabled();
        expect(weekSelect).toBeDisabled();
        expect(weekdaySelect).toBeDisabled();

        // 4. Click "On the" radio button
        await userEvent.click(onTheRadio);

        // 5. Assert that the inputs have toggled their disabled state
        expect(onTheRadio).toBeChecked();
        expect(dayInput).toBeDisabled();
        expect(weekSelect).not.toBeDisabled();
        expect(weekdaySelect).not.toBeDisabled();

        // 6. Click "On day" radio button again
        await userEvent.click(onDayRadio);

        // 7. Assert that the state has returned to the initial state
        expect(onDayRadio).toBeChecked();
        expect(dayInput).not.toBeDisabled();
        expect(weekSelect).toBeDisabled();
        expect(weekdaySelect).toBeDisabled();
    });
});

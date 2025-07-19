import { calculateRecurringDates } from '../lib/dateLogic';

describe('calculateRecurringDates (Unit Tests)', () => {
    const baseParams = {
        endDate: null,
        weeklyDays: { Sun: false, Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false },
        monthlyOption: 'dayOfMonth',
        monthlyDay: 15,
        monthlyWeek: 2,
        monthlyWeekday: 2,
    };

    // Test Daily Recurrence
    describe('Daily', () => {
        it('should calculate correct dates for every day', () => {
            const params = { ...baseParams, recurrenceType: 'daily', interval: 1, startDate: new Date('2025-08-01') };
            const dates = calculateRecurringDates(params);
            expect(dates).toContain('2025-08-01');
            expect(dates).toContain('2025-08-02');
            expect(dates).toContain('2025-08-03');
        });

        it('should calculate correct dates for every 3 days', () => {
            const params = { ...baseParams, recurrenceType: 'daily', interval: 3, startDate: new Date('2025-08-01') };
            const dates = calculateRecurringDates(params);
            expect(dates).toContain('2025-08-01');
            expect(dates).not.toContain('2025-08-02');
            expect(dates).not.toContain('2025-08-03');
            expect(dates).toContain('2025-08-04');
        });
    });

    // Test Weekly Recurrence
    describe('Weekly', () => {
        it('should calculate correct dates for every Tuesday', () => {
            const params = { ...baseParams, recurrenceType: 'weekly', interval: 1, startDate: new Date('2025-08-01'), weeklyDays: { ...baseParams.weeklyDays, Tue: true } };
            const dates = calculateRecurringDates(params);
            expect(dates).toContain('2025-08-05');
            expect(dates).toContain('2025-08-12');
            expect(dates).not.toContain('2025-08-06');
        });
    });

    // Test Monthly Recurrence
    describe('Monthly', () => {
        it('should calculate correct dates for the 15th of every month', () => {
            const params = { ...baseParams, recurrenceType: 'monthly', interval: 1, startDate: new Date('2025-08-01'), monthlyOption: 'dayOfMonth', monthlyDay: 15 };
            const dates = calculateRecurringDates(params);
            expect(dates).toContain('2025-08-15');
            expect(dates).toContain('2025-09-15');
            expect(dates).not.toContain('2025-08-16');
        });

        it('should calculate correct dates for the 2nd Tuesday of every month', () => {
            const params = { ...baseParams, recurrenceType: 'monthly', interval: 1, startDate: new Date('2025-08-01'), monthlyOption: 'dayOfWeek', monthlyWeek: 2, monthlyWeekday: 2 };
            const dates = calculateRecurringDates(params);
            expect(dates).toContain('2025-08-12'); // 2nd Tuesday of Aug 2025
            expect(dates).toContain('2025-09-09'); // 2nd Tuesday of Sep 2025
        });
    });

     // Test Yearly Recurrence
    describe('Yearly', () => {
        it('should calculate correct dates for every year', () => {
            const params = { ...baseParams, recurrenceType: 'yearly', interval: 1, startDate: new Date('2025-08-01') };
            const dates = calculateRecurringDates(params);
            expect(dates).toContain('2025-08-01');
            expect(dates).toContain('2026-08-01');
            expect(dates).toContain('2027-08-01');
            expect(dates).not.toContain('2025-08-02');
        });
    });
});

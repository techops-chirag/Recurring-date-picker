'use client';

import React, { useState, useEffect, useContext } from 'react';
import { DatePickerProvider, DatePickerContext } from './context/DatePickerContext';
import RecurrenceTypeSelector from './components/RecurrenceTypeSelector';
import WeeklyOptions from './components/WeeklyOptions';
import MonthlyOptions from './components/MonthlyOptions';
import DateRangeSelector from './components/DateRangeSelector';
import MiniCalendarPreview from './components/MiniCalendarPreview';
import IntervalInput from './components/IntervalInput';

const DailyOptions = () => <IntervalInput label="day(s)" />;
const YearlyOptions = () => <IntervalInput label="year(s)" />;

const RecurringDatePicker = () => {
    const { recurrenceType } = useContext(DatePickerContext);
    return (
        <div className="space-y-6">
            <RecurrenceTypeSelector />
            <div className="p-4 bg-gray-50 rounded-lg">
                {recurrenceType === 'daily' && <DailyOptions />}
                {recurrenceType === 'weekly' && <WeeklyOptions />}
                {recurrenceType === 'monthly' && <MonthlyOptions />}
                {recurrenceType === 'yearly' && <YearlyOptions />}
            </div>
            <DateRangeSelector />
        </div>
    );
};

export default function HomePage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <main className="bg-gray-100 min-h-screen flex items-center justify-center font-sans p-4">
            {isClient ? (
                <DatePickerProvider>
                    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
                        <div className="w-full md:w-1/2 p-6 md:p-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-6">Recurring Date Picker</h1>
                            <RecurringDatePicker />
                        </div>
                        <div className="w-full md:w-1/2 bg-gray-50 p-6 md:p-8">
                            <MiniCalendarPreview />
                        </div>
                    </div>
                </DatePickerProvider>
            ) : (
                <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-pulse">
                    <div className="w-full md:w-1/2 p-6 md:p-8 space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-12 bg-gray-200 rounded"></div>
                        <div className="h-40 bg-gray-200 rounded"></div>
                        <div className="h-24 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-full md:w-1/2 bg-gray-50 p-6 md:p-8">
                         <div className="h-full bg-gray-200 rounded"></div>
                    </div>
                </div>
            )}
        </main>
    );
}

'use client';

import React, { useContext } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';
import IntervalInput from './IntervalInput';

const WeeklyOptions = () => {
    const { weeklyDays, setWeeklyDays } = useContext(DatePickerContext);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const toggleDay = (day) => {
        setWeeklyDays(prev => ({ ...prev, [day]: !prev[day] }));
    };

    return (
        <div className="space-y-4">
            <IntervalInput label="week(s)" />
            <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">On these days</label>
                <div className="flex justify-between space-x-1">
                    {days.map(day => (
                        <button
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`h-10 w-10 rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-center ${
                                weeklyDays[day] ? 'bg-blue-600 text-white ring-2 ring-offset-2 ring-blue-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {day.substring(0,2)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeeklyOptions;

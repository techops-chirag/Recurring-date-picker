'use client';

import React, { useContext } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';
import IntervalInput from './IntervalInput';

const MonthlyOptions = () => {
    const { monthlyOption, setMonthlyOption, monthlyDay, setMonthlyDay, monthlyWeek, setMonthlyWeek, monthlyWeekday, setMonthlyWeekday } = useContext(DatePickerContext);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekOrders = ["first", "second", "third", "fourth", "last"];

    const handleDayChange = (e) => {
        // FIX: Add a fallback value of 1 to parseInt.
        // If the user clears the input, e.target.value is '', and parseInt('') is NaN.
        // The '|| 1' ensures that if the result is NaN, it defaults to 1, preventing the error.
        setMonthlyDay(parseInt(e.target.value) || 1);
    };

    return (
        <div className="space-y-4">
            <IntervalInput label="month(s)" />
            <div className="space-y-2">
                <div className="flex items-center">
                    <input type="radio" id="dayOfMonth" name="monthlyOption" value="dayOfMonth" checked={monthlyOption === 'dayOfMonth'} onChange={() => setMonthlyOption('dayOfMonth')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                    <label htmlFor="dayOfMonth" className="ml-3 block text-sm text-gray-700">On day</label>
                    <input 
                        type="number" 
                        min="1" 
                        max="31" 
                        value={monthlyDay} 
                        onChange={handleDayChange} 
                        className="ml-2 w-16 p-1 border border-gray-300 rounded-md text-center" 
                        disabled={monthlyOption !== 'dayOfMonth'}
                    />
                </div>
                <div className="flex items-center">
                    <input type="radio" id="dayOfWeek" name="monthlyOption" value="dayOfWeek" checked={monthlyOption === 'dayOfWeek'} onChange={() => setMonthlyOption('dayOfWeek')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                    <label htmlFor="dayOfWeek" className="ml-3 block text-sm text-gray-700">On the</label>
                     <select value={monthlyWeek} onChange={e => setMonthlyWeek(parseInt(e.target.value))} className="ml-2 p-1 border border-gray-300 rounded-md" disabled={monthlyOption !== 'dayOfWeek'}>
                        {weekOrders.map((order, i) => <option key={order} value={i + 1}>{order}</option>)}
                    </select>
                    <select value={monthlyWeekday} onChange={e => setMonthlyWeekday(parseInt(e.target.value))} className="ml-2 p-1 border border-gray-300 rounded-md" disabled={monthlyOption !== 'dayOfWeek'}>
                        {weekdays.map((day, i) => <option key={day} value={i}>{day}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default MonthlyOptions;

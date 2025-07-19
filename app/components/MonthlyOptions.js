'use client';

import React, { useContext } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';
import IntervalInput from './IntervalInput';

const MonthlyOptions = () => {
    const { monthlyOption, setMonthlyOption, monthlyDay, setMonthlyDay, monthlyWeek, setMonthlyWeek, monthlyWeekday, setMonthlyWeekday } = useContext(DatePickerContext);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekOrders = ["first", "second", "third", "fourth", "last"];

    const handleDayChange = (e) => {
        setMonthlyDay(parseInt(e.target.value) || 1);
    };

    return (
        <div className="space-y-4">
            <IntervalInput label="month(s)" />
            <div className="bg-gray-100 p-3 rounded-lg space-y-3">
                <div className="flex items-center">
                    <input type="radio" id="dayOfMonth" name="monthlyOption" value="dayOfMonth" checked={monthlyOption === 'dayOfMonth'} onChange={() => setMonthlyOption('dayOfMonth')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                    <label htmlFor="dayOfMonth" className="ml-3 block text-sm text-gray-700 w-20">On day</label>
                    <input 
                        type="number" 
                        min="1" 
                        max="31" 
                        value={monthlyDay} 
                        onChange={handleDayChange} 
                        className="w-20 p-1 border border-gray-300 rounded-md text-center text-gray-900 disabled:bg-gray-200 disabled:text-gray-500" 
                        disabled={monthlyOption !== 'dayOfMonth'}
                        // FIX: Add a data-testid for easy selection in tests.
                        data-testid="monthly-day-input"
                    />
                </div>
                <div className="flex items-center">
                    <input type="radio" id="dayOfWeek" name="monthlyOption" value="dayOfWeek" checked={monthlyOption === 'dayOfWeek'} onChange={() => setMonthlyOption('dayOfWeek')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                    <label htmlFor="dayOfWeek" className="ml-3 block text-sm text-gray-700 w-20">On the</label>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <select value={monthlyWeek} onChange={e => setMonthlyWeek(parseInt(e.target.value))} className="appearance-none w-full bg-white border border-gray-300 text-gray-900 py-1 pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 disabled:bg-gray-200 disabled:text-gray-500" disabled={monthlyOption !== 'dayOfWeek'}>
                                {weekOrders.map((order, i) => <option key={order} value={i + 1}>{order}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                         <div className="relative">
                            <select value={monthlyWeekday} onChange={e => setMonthlyWeekday(parseInt(e.target.value))} className="appearance-none w-full bg-white border border-gray-300 text-gray-900 py-1 pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 disabled:bg-gray-200 disabled:text-gray-500" disabled={monthlyOption !== 'dayOfWeek'}>
                                {weekdays.map((day, i) => <option key={day} value={i}>{day}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyOptions;

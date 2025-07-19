'use client';

import React, { useContext } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';

const toYYYYMMDD = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const DateRangeSelector = () => {
    const { startDate, setStartDate, endDate, setEndDate } = useContext(DatePickerContext);

    const handleStartDateChange = (e) => {
        setStartDate(new Date(e.target.value + 'T12:00:00'));
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value ? new Date(e.target.value + 'T12:00:00') : null);
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="start-date" className="text-sm font-medium text-gray-600 mb-2 block">Start Date</label>
                <input 
                    type="date" 
                    id="start-date" 
                    value={toYYYYMMDD(startDate)} 
                    disabled={!startDate}
                    onChange={handleStartDateChange} 
                    className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
            </div>
            <div>
                <label htmlFor="end-date" className="text-sm font-medium text-gray-600 mb-2 block">End Date (Optional)</label>
                <input 
                    type="date" 
                    id="end-date" 
                    value={toYYYYMMDD(endDate)} 
                    disabled={!startDate}
                    onChange={handleEndDateChange} 
                    className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
            </div>
        </div>
    );
};

export default DateRangeSelector;

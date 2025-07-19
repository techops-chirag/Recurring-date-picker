'use client';

import React, { useContext } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';

const IntervalInput = ({ label }) => {
    const { interval, setInterval } = useContext(DatePickerContext);
    
    return (
        <div className="flex items-center space-x-2">
            <span className="text-gray-700">Every</span>
            <input
                type="number"
                min="1"
                value={interval}
                onChange={(e) => setInterval(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 p-2 border border-gray-300 rounded-md text-center"
            />
            <span className="text-gray-700">{label}</span>
        </div>
    );
};

export default IntervalInput;

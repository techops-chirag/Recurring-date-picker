'use client';

import React, { useContext, useState, useEffect } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';

const IntervalInput = ({ label }) => {
    const { interval, setInterval } = useContext(DatePickerContext);
    
    const [displayValue, setDisplayValue] = useState(interval.toString());

    useEffect(() => {
        setDisplayValue(interval.toString());
    }, [interval]);

    const handleChange = (e) => {
        const value = e.target.value;
        setDisplayValue(value);

        const num = parseInt(value, 10);
        if (!isNaN(num) && num > 0) {
            setInterval(num);
        }
    };

    const handleBlur = () => {
        if (displayValue === '' || parseInt(displayValue, 10) < 1 || isNaN(parseInt(displayValue, 10))) {
            setDisplayValue('1');
            setInterval(1);
        }
    };
    
    return (
        <div className="flex items-center space-x-2">
            <span className="text-gray-700">Every</span>
            <input
                type="number"
                min="1"
                value={displayValue}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-16 p-2 border border-gray-300 rounded-md text-center text-gray-900"
            />
            <span className="text-gray-700">{label}</span>
        </div>
    );
};

export default IntervalInput;

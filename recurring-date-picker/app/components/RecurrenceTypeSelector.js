'use client';

import React, { useContext } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';

const RecurrenceTypeSelector = () => {
    const { recurrenceType, setRecurrenceType } = useContext(DatePickerContext);
    const types = ['daily', 'weekly', 'monthly', 'yearly'];

    return (
        <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">Repeat</label>
            <div className="flex space-x-2 rounded-lg bg-gray-200 p-1">
                {types.map(type => (
                    <button
                        key={type}
                        onClick={() => setRecurrenceType(type)}
                        className={`w-full py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                            recurrenceType === type
                                ? 'bg-white text-blue-600 shadow'
                                : 'bg-transparent text-gray-600 hover:bg-gray-300'
                        }`}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RecurrenceTypeSelector;

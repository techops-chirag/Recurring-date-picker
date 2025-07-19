'use client';

import React, { useState, createContext, useEffect } from 'react';

const getWeekOfMonth = (year, month, day) => {
    if (!year && year !== 0 || !month && month !== 0 || !day) return 1;
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const adjustedDate = day + firstDayOfMonth - 1;
    return Math.floor(adjustedDate / 7) + 1;
};

export const DatePickerContext = createContext();

export const DatePickerProvider = ({ children }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    const [recurrenceType, setRecurrenceType] = useState('daily');
    const [interval, setInterval] = useState(1);
    const [weeklyDays, setWeeklyDays] = useState({
        Sun: false, Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false
    });
    const [monthlyOption, setMonthlyOption] = useState('dayOfMonth');
    
    const [monthlyDay, setMonthlyDay] = useState(1);
    const [monthlyWeek, setMonthlyWeek] = useState(1);
    const [monthlyWeekday, setMonthlyWeekday] = useState(0);
    
    useEffect(() => {
        // FIX: Normalize the current date to the beginning of the day (midnight).
        // This prevents time-of-day mismatches when comparing dates.
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setStartDate(today);
    }, []);

    useEffect(() => {
        if (!startDate) return;

        setMonthlyDay(startDate.getDate());
        setMonthlyWeek(getWeekOfMonth(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
        setMonthlyWeekday(startDate.getDay());
        
        const dayMap = {0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat'};
        const newWeeklyDays = { Sun: false, Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false };
        newWeeklyDays[dayMap[startDate.getDay()]] = true;
        setWeeklyDays(newWeeklyDays);
    }, [startDate]);

    const state = {
        startDate, setStartDate,
        endDate, setEndDate,
        recurrenceType, setRecurrenceType,
        interval, setInterval,
        weeklyDays, setWeeklyDays,
        monthlyOption, setMonthlyOption,
        monthlyDay, setMonthlyDay,
        monthlyWeek, setMonthlyWeek,
        monthlyWeekday, setMonthlyWeekday,
    };

    return (
        <DatePickerContext.Provider value={state}>
            {children}
        </DatePickerContext.Provider>
    );
};

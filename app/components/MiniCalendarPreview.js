'use client';

import React, { useState, useMemo, useContext, useEffect } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getDayOfWeek = (year, month, day) => new Date(year, month, day).getDay();

const toYYYYMMDD = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const MiniCalendarPreview = () => {
    const { startDate, endDate, recurrenceType, interval, weeklyDays, monthlyOption, monthlyDay, monthlyWeek, monthlyWeekday } = useContext(DatePickerContext);
    
    const [currentMonth, setCurrentMonth] = useState(null);
    const [currentYear, setCurrentYear] = useState(null);
    
    useEffect(() => {
        if(startDate) {
            setCurrentMonth(startDate.getMonth());
            setCurrentYear(startDate.getFullYear());
        }
    }, [startDate]);

    const recurringDates = useMemo(() => {
        const dates = new Set();
        if (!startDate) return dates;

        const finalEndDate = endDate ? new Date(endDate.getTime()) : new Date(startDate.getFullYear() + 5, 0, 1);
        const addDate = (d) => {
            if (d >= startDate && d <= finalEndDate) {
                dates.add(toYYYYMMDD(d));
            }
        };
        
        if (recurrenceType === 'daily') {
            let tempDate = new Date(startDate.getTime());
            while (tempDate <= finalEndDate) {
                addDate(new Date(tempDate.getTime()));
                tempDate.setDate(tempDate.getDate() + interval);
            }
        } else if (recurrenceType === 'weekly') {
             let tempDate = new Date(startDate.getTime());
             let dayCounter = 0;
             while(tempDate <= finalEndDate) {
                if (Math.floor(dayCounter / 7) % interval === 0) {
                    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][tempDate.getDay()];
                    if (weeklyDays[dayName]) addDate(new Date(tempDate.getTime()));
                }
                tempDate.setDate(tempDate.getDate() + 1);
                dayCounter++;
             }
        } else if (recurrenceType === 'monthly') {
            let tempDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
            while (tempDate <= finalEndDate) {
                 const year = tempDate.getFullYear(), month = tempDate.getMonth();
                 const monthDiff = (year - startDate.getFullYear()) * 12 + (month - startDate.getMonth());
                if (monthDiff >= 0 && monthDiff % interval === 0) {
                    if (monthlyOption === 'dayOfMonth') {
                        const dateInMonth = new Date(year, month, monthlyDay);
                        if (dateInMonth.getMonth() === month) addDate(dateInMonth);
                    } else {
                        const firstDayOfMonth = new Date(year, month, 1).getDay();
                        let firstOccurrence = 1 - firstDayOfMonth + monthlyWeekday;
                        if (firstOccurrence < 1) firstOccurrence += 7;
                        let dateOfMonth = (monthlyWeek <= 4) ? firstOccurrence + (monthlyWeek - 1) * 7 : (() => {
                            const totalDays = getDaysInMonth(year, month);
                            let last = firstOccurrence + 3 * 7;
                            while(last + 7 <= totalDays) last += 7;
                            return last;
                        })();
                        if (dateOfMonth <= getDaysInMonth(year, month)) addDate(new Date(year, month, dateOfMonth));
                    }
                }
                tempDate.setMonth(tempDate.getMonth() + 1);
            }
        } else if (recurrenceType === 'yearly') {
             let tempDate = new Date(startDate.getTime());
             while (tempDate <= finalEndDate) {
                addDate(new Date(tempDate.getTime()));
                tempDate.setFullYear(tempDate.getFullYear() + interval);
            }
        }
        return dates;
    }, [startDate, endDate, recurrenceType, interval, weeklyDays, monthlyOption, monthlyDay, monthlyWeek, monthlyWeekday]);

    const changeMonth = (delta) => {
        let newMonth = currentMonth + delta, newYear = currentYear;
        if (newMonth > 11) { newMonth = 0; newYear++; } 
        else if (newMonth < 0) { newMonth = 11; newYear--; }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    if (currentYear === null || currentMonth === null) {
        return null;
    }

    const calendarGrid = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDayOfMonth = getDayOfWeek(currentYear, currentMonth, 1);
        const grid = [];
        ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(day => grid.push(<div key={day} className="text-xs font-medium text-gray-500 text-center">{day}</div>));
        for (let i = 0; i < firstDayOfMonth; i++) grid.push(<div key={`empty-${i}`} />);
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = toYYYYMMDD(new Date(currentYear, currentMonth, day));
            const isRecurring = recurringDates.has(dateStr);
            grid.push(
                <div key={`day-${day}`} className="flex items-center justify-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-200 ${
                        isRecurring ? 'bg-blue-500 text-white font-bold' : 'text-gray-700'
                    }`}>{day}</span>
                </div>
            );
        }
        return grid;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-inner h-full flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">Preview</h2>
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                <div className="font-semibold text-gray-700">{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</div>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
            </div>
            <div className="grid grid-cols-7 gap-y-2">{calendarGrid()}</div>
            <div className="mt-auto pt-4 text-xs text-center text-gray-500">Showing recurring dates. Limited to a 5-year preview.</div>
        </div>
    );
};

export default MiniCalendarPreview;

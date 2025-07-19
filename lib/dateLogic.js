// Helper function to format a date to 'YYYY-MM-DD' string
const toYYYYMMDD = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Helper function to get the number of days in a month
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

// This function contains the core logic for calculating all recurring dates.
// It's a pure function, making it easy to unit test.
export const calculateRecurringDates = ({
    startDate,
    endDate,
    recurrenceType,
    interval,
    weeklyDays,
    monthlyOption,
    monthlyDay,
    monthlyWeek,
    monthlyWeekday,
}) => {
    const dates = new Set();
    if (!startDate) return dates;

    const finalEndDate = endDate ? new Date(endDate.getTime()) : new Date(startDate.getFullYear() + 5, 0, 1);
    
    const addDate = (d) => {
        const normalizedDate = new Date(d.getTime());
        normalizedDate.setHours(0,0,0,0);

        if (normalizedDate >= startDate && normalizedDate <= finalEndDate) {
            dates.add(toYYYYMMDD(normalizedDate));
        }
    };

    if (recurrenceType === 'daily') {
        let tempDate = new Date(startDate.getTime());
        while (tempDate <= finalEndDate) {
            addDate(tempDate);
            tempDate.setDate(tempDate.getDate() + interval);
        }
    } else if (recurrenceType === 'weekly') {
        let tempDate = new Date(startDate.getTime());
        while (tempDate <= finalEndDate) {
            const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][tempDate.getDay()];
            if (weeklyDays[dayName]) {
                 // Check if the current week is in the interval
                const startDayOfWeek = startDate.getDay();
                const daysSinceStart = (tempDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
                const weeksSinceStart = Math.floor((daysSinceStart + startDayOfWeek) / 7);
                if (weeksSinceStart % interval === 0) {
                    addDate(tempDate);
                }
            }
            tempDate.setDate(tempDate.getDate() + 1);
        }
    } else if (recurrenceType === 'monthly') {
        let tempDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        while (tempDate <= finalEndDate) {
            const year = tempDate.getFullYear();
            const month = tempDate.getMonth();
            const monthDiff = (year - startDate.getFullYear()) * 12 + (month - startDate.getMonth());

            if (monthDiff >= 0 && monthDiff % interval === 0) {
                if (monthlyOption === 'dayOfMonth') {
                    const dateInMonth = new Date(year, month, monthlyDay);
                    if (dateInMonth.getMonth() === month) {
                        addDate(dateInMonth);
                    }
                } else {
                    const firstDayOfMonth = new Date(year, month, 1).getDay();
                    let firstOccurrence = 1 - firstDayOfMonth + monthlyWeekday;
                    if (firstOccurrence < 1) firstOccurrence += 7;

                    let dateOfMonth;
                    if (monthlyWeek <= 4) {
                        dateOfMonth = firstOccurrence + (monthlyWeek - 1) * 7;
                    } else { // 'last' week
                        const totalDays = getDaysInMonth(year, month);
                        let lastOccurrence = firstOccurrence + 3 * 7;
                        while (lastOccurrence + 7 <= totalDays) {
                            lastOccurrence += 7;
                        }
                        dateOfMonth = lastOccurrence;
                    }
                    
                    if (dateOfMonth <= getDaysInMonth(year, month)) {
                        addDate(new Date(year, month, dateOfMonth));
                    }
                }
            }
            tempDate.setMonth(tempDate.getMonth() + 1);
        }
    } else if (recurrenceType === 'yearly') {
        let tempDate = new Date(startDate.getTime());
        while (tempDate <= finalEndDate) {
            addDate(tempDate);
            tempDate.setFullYear(tempDate.getFullYear() + interval);
        }
    }

    return dates;
};

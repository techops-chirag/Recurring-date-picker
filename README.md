
# 🗓️ Recurring Date Picker Component

A **reusable and highly customizable recurring date picker** built with **Next.js** and **Tailwind CSS**. Designed to mimic the powerful recurrence logic of apps like **TickTick**, this component offers a user-friendly interface for creating complex scheduling patterns.

This project was developed as a solution for a front-end engineering assignment, showcasing modular design, dynamic interactivity, and clean code structure.

---

## ✨ Features

✅ **Multiple Recurrence Options**
- Daily  
- Weekly  
- Monthly  
- Yearly  

✅ **Flexible Interval Control**
- Set events to repeat every _X_ days, weeks, months, or years.

✅ **Advanced Weekly Selection**
- Select specific weekdays for repeating events.

✅ **Complex Monthly Patterns**
- Repeat on a specific **day of the month** (e.g., 15th).
- Repeat on a **weekday of a specific week** (e.g., second Tuesday of every month).

✅ **Date Range Selection**
- Choose a **start date** (required).
- Choose an **end date** (optional).

✅ **Live Calendar Preview**
- Automatically shows selected recurrence dates in a **mini calendar view** as options are changed.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Testing**: Jest, React Testing Library, @testing-library/user-event

---

## 🧪 Testing

This project includes **unit tests** for core logic and **integration tests** for UI flows.

To run all tests:

```bash
npm test
```

Jest will run in watch mode and re-run relevant tests automatically when you update code.

---

## 📁 Project Structure

```
recurring-date-picker/
├── __tests__/
│   ├── dateLogic.test.js       # Unit tests for the core logic
│   └── HomePage.test.js        # Integration test for the main page
│
├── app/
│   ├── components/
│   │   ├── DateRangeSelector.js
│   │   ├── IntervalInput.js
│   │   ├── MiniCalendarPreview.js
│   │   ├── MonthlyOptions.js
│   │   ├── RecurrenceTypeSelector.js
│   │   └── WeeklyOptions.js
│   │
│   ├── context/
│   │   └── DatePickerContext.js    # State management for the component
│   │
│   ├── globals.css
│   ├── layout.js
│   └── page.js                 # The main page that assembles the components
│
├── lib/
│   └── dateLogic.js            # The extracted, testable date calculation logic
│
├── node_modules/
├── public/
│   ├── next.svg
│   └── vercel.svg
│
├── .gitignore
├── jest.config.js              # Jest configuration file
├── jest.setup.js               # Jest setup file
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
└── tailwind.config.js
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/techops-chirag/Recurring-date-picker.git
cd Recurring-date-picker
npm install
npm run dev
```

Visit `http://localhost:3000` to view the app locally.

---

## 📄 License

This project is for demonstration and educational purposes. All rights reserved to the author.

---

## 🙋‍♂️ Author

**Chirag Saini**  
💼 [LinkedIn](https://www.linkedin.com/in/chiraggs)  
📧 chirag111saini@gmail.com  
🌐 [GitHub](https://github.com/techops-chirag)

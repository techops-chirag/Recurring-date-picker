Recurring Date Picker Component
This is a reusable recurring date picker component built with Next.js and Tailwind CSS, similar to the feature found in productivity apps like TickTick. It allows users to select complex recurrence patterns for events or tasks.

This project was built as a solution to a front-end assignment.

Features
Multiple Recurrence Options: Select from Daily, Weekly, Monthly, or Yearly recurrence.

Flexible Interval Control: Set events to recur every "X" days, weeks, months, or years.

Advanced Weekly Selection: Choose specific days of the week for an event to repeat on.

Complex Monthly Patterns:

Repeat on a specific day of the month (e.g., the 15th).

Repeat on a specific day of a specific week (e.g., the second Tuesday of every month).

Date Range Selection:

A required Start Date for the recurrence to begin.

An optional End Date for when the recurrence should stop.

Live Calendar Preview: An interactive mini-calendar on the right-hand side visually displays all the calculated recurring dates, updating in real-time as options are changed.

Tech Stack
Framework: Next.js (React)

Styling: Tailwind CSS

State Management: React Context API

Testing: Jest, React Testing Library, and User Event

Project Structure
The project is organized into a clean and maintainable structure to promote separation of concerns.

recurring-date-picker/
├── __tests__/              # Contains all unit and integration tests.
│   ├── dateLogic.test.js
│   └── HomePage.test.js
├── app/
│   ├── components/         # Reusable UI components.
│   ├── context/            # React Context for global state management.
│   ├── lib/                # Core, testable business logic (date calculations).
│   ├── globals.css
│   ├── layout.js
│   └── page.js             # The main entry point page for the application.
├── jest.config.js          # Jest configuration.
├── package.json
└── README.md

Getting Started
Follow these instructions to get the project up and running on your local machine.

Prerequisites
You need to have Node.js (version 18.x or later) and npm installed on your computer.

Installation
Clone the repository to your local machine:

git clone <your-repository-url>

Navigate into the project directory:

cd recurring-date-picker

Install all the required dependencies:

npm install

Running the Development Server
Once the installation is complete, you can run the application in development mode:

npm run dev

Open http://localhost:3000 with your browser to see the result.

Running Tests
This project includes both unit tests for the core logic and an integration test for the UI components. To run the test suite, execute the following command in your terminal:

npm test

This will run Jest in watch mode, automatically re-running tests when you make changes to the files.
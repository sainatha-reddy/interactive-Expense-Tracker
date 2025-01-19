# Expense Tracker Web Application

## Project Description
A modern expense tracking application that helps users manage their finances effectively. Built with React and Firebase, this application provides an intuitive interface for tracking expenses, setting budgets, and visualizing spending patterns through interactive charts.

## Features and Functionality

### 1. User Authentication
- Secure login system
- Predefined credentials:
  - Email: user@gmail.com
  - Password: expensetracker
  - Email: user2@gmail.com
  - Password: expensetracker

### 2. Expense Management
- Add new expenses with details:
  - Amount
  - Category
  - Date
  - Description
- Delete existing expenses
- View expense history

### 3. Budget Tracking
- Set monthly budget
- Real-time budget progress tracking
- Visual indicators for:
  - Remaining budget
  - Over-budget warnings
  - Percentage of budget used

### 4. Visual Analytics
- Interactive pie chart showing expenses by category
- Bar chart displaying daily expenses
- Monthly overview with total expenses
- Budget progress visualization

### 5. User Interface
- Modern, responsive design
- Dark mode support
- Intuitive navigation
- Real-time updates

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm 
- Web browser

### Installation Steps

1. Clone the repository:
2. Install dependencies:
  bash:
  npm install
3. 3. Start the development server:
  bash:
  npm run dev

4. Access the application:
- Open your web browser
- Navigate to `http://localhost:5173`
- Login using the provided credentials

## Group Members

### 1. K.Akshay(CS23B1026)

### 2. G.Shanumukha(CS23B1032)

### 3. K.Krishna Chaitanya(CS23B1026)

### 4. Y.Sainatha Reddy(CS23I1010)

## Project Structure 

expense-tracker/
├── src/
│ ├── components/
│ │ ├── Dashboard.tsx
│ │ ├── ExpenseList.tsx
│ │ ├── Login.tsx
│ │ └── ui/
│ ├── lib/
│ │ └── firebase.ts
│ ├── services/
│ │ └── expenseService.ts
│ └── App.tsx
├── public/
└── README.md

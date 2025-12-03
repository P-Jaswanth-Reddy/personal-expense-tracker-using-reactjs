import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import ExpenseChart from '../components/ExpenseChart';
import MonthlyTrendChart from '../components/MonthlyTrendChart';
import StatsCard from '../components/StatsCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { categories, expenses, loading } = useExpense();

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  // Calculate statistics
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  }).reduce((sum, expense) => sum + expense.amount, 0);

  const categoriesCount = categories.length;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
      </div>

      <div className="stats-grid">
        <StatsCard 
          title="TOTAL EXPENSES"
          amount={totalExpenses}
          type="total"
        />
        <StatsCard 
          title="THIS MONTH"
          amount={thisMonthExpenses}
          type="month"
        />
        <StatsCard 
          title="CATEGORIES"
          amount={categoriesCount}
          type="categories"
        />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Expense Distribution by Category</h3>
          <ExpenseChart expenses={expenses} categories={categories} />
        </div>

        <div className="chart-card">
          <h3>Monthly Spending Trend</h3>
          <MonthlyTrendChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
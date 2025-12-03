import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import ExpenseChart from '../components/ExpenseChart';
import MonthlyTrendChart from '../components/MonthlyTrendChart';

const Dashboard = () => {
  const { categories, expenses, loading } = useExpense();

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#20B2AA' }}>
      Loading dashboard...
    </div>;
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  }).reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div style={{ padding: '2rem', marginLeft: '250px' }}>
      <h1 style={{ color: '#ffffff', marginBottom: '2rem' }}>Dashboard Overview</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #2d2d2d 0%, #404040 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center',
          transition: 'transform 0.3s ease'
        }}>
          <h3 style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>TOTAL EXPENSES</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#20B2AA' }}>
            ₹{totalExpenses.toLocaleString()}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #2d2d2d 0%, #404040 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center',
          transition: 'transform 0.3s ease'
        }}>
          <h3 style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>THIS MONTH</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#36A2EB' }}>
            ₹{thisMonthExpenses.toLocaleString()}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #2d2d2d 0%, #404040 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center',
          transition: 'transform 0.3s ease'
        }}>
          <h3 style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>CATEGORIES</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFCE56' }}>
            {categories.length}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '2rem' }}>
        <div style={{
          backgroundColor: '#2d2d2d',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #404040'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#ffffff', textAlign: 'center', fontSize: '1.2rem' }}>
            Expense Distribution by Category
          </h3>
          <ExpenseChart expenses={expenses} categories={categories} />
        </div>

        <div style={{
          backgroundColor: '#2d2d2d',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #404040'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#ffffff', textAlign: 'center', fontSize: '1.2rem' }}>
            Monthly Spending Trend
          </h3>
          <MonthlyTrendChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
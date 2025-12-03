import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses, categories }) => {
  // Calculate expenses by category
  const categoryTotals = {};

  expenses.forEach(expense => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  // Get category colors and emojis
  const categoryColors = [
    '#20B2AA', '#FF6384', '#36A2EB', '#FFCE56', 
    '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'
  ];

  const data = {
    labels: Object.keys(categoryTotals).map(category => {
      const cat = categories.find(c => c.name === category);
      return cat ? `${cat.emoji} ${category}` : category;
    }),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: categoryColors.slice(0, Object.keys(categoryTotals).length),
        borderColor: '#2d2d2d',
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff',
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed * 100) / total).toFixed(1);
            return `₹${context.parsed.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  if (Object.keys(categoryTotals).length === 0) {
    return (
      <div className="chart-placeholder">
        <p>No expense data available</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;
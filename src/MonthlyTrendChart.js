import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyTrendChart = ({ expenses }) => {
  // Get last 6 months data
  const months = [];
  const currentDate = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    months.push({
      month: date.getMonth(),
      year: date.getFullYear(),
      label: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });
  }

  // Calculate monthly totals
  const monthlyTotals = months.map(month => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === month.month && 
             expenseDate.getFullYear() === month.year;
    }).reduce((sum, expense) => sum + expense.amount, 0);
  });

  const data = {
    labels: months.map(m => m.label),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyTotals,
        borderColor: '#20B2AA',
        backgroundColor: 'rgba(32, 178, 170, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#404040'
        },
        ticks: {
          color: '#ffffff'
        }
      },
      y: {
        grid: {
          color: '#404040'
        },
        ticks: {
          color: '#ffffff',
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyTrendChart;
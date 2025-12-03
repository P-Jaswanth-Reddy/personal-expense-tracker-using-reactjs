# Create React Components

# Protected Route Component
protected_route = '''import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;'''

# Navigation Component
navigation = '''import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navigation.css';

const Navigation = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h2>Expense Tracker</h2>
      </div>
      
      <ul className="nav-links">
        <li>
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className="nav-link">
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-expense" className="nav-link">
            Add Expense
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className="nav-link">
            History
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className="nav-link logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;'''

# Stats Card Component
stats_card = '''import React from 'react';

const StatsCard = ({ title, amount, type }) => {
  const formatAmount = (amount) => {
    if (type === 'categories') {
      return amount.toString();
    }
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className={`stats-card stats-card-${type}`}>
      <div className="stats-card-header">
        <h3>{title}</h3>
      </div>
      <div className="stats-card-amount">
        {formatAmount(amount)}
      </div>
    </div>
  );
};

export default StatsCard;'''

# Expense Chart Component
expense_chart = '''import React from 'react';
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

export default ExpenseChart;'''

# Monthly Trend Chart Component
monthly_chart = '''import React from 'react';
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

export default MonthlyTrendChart;'''

# Create components
components = {
    'src/components/ProtectedRoute.js': protected_route,
    'src/components/Navigation.js': navigation,
    'src/components/StatsCard.js': stats_card,
    'src/components/ExpenseChart.js': expense_chart,
    'src/components/MonthlyTrendChart.js': monthly_chart
}

# Write component files
for file_path, content in components.items():
    directory = os.path.dirname(file_path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created: {file_path}")

print("\n📊 React Components created successfully!")
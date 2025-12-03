# Create React Pages

# Login Page
login_page = '''import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Personal Expense Tracker</h1>
          <button 
            className="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            Sign in with Google
          </button>
        </div>

        <div className="login-form-section">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>

          <div className="toggle-mode">
            <span>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                className="toggle-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;'''

# Dashboard Page
dashboard_page = '''import React from 'react';
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

export default Dashboard;'''

# Add Expense Page
add_expense_page = '''import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AddExpense.css';

const AddExpense = () => {
  const { categories, addExpense } = useExpense();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.title || !formData.amount || !formData.category) {
        throw new Error('Please fill in all required fields');
      }

      await addExpense({
        ...formData,
        amount: parseFloat(formData.amount),
        date: formData.date
      });

      // Check budget limits and show alert if exceeded
      checkBudgetLimits(formData.category, parseFloat(formData.amount));

      setFormData({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });

      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const checkBudgetLimits = (categoryName, newExpenseAmount) => {
    const category = categories.find(cat => cat.name === categoryName);
    if (!category) return;

    // Calculate current spending for this category
    // This would need to be implemented with actual expense data
    // For now, we'll show a simple alert
    if (newExpenseAmount > category.budget * 0.1) { // 10% threshold
      alert(`Warning: This expense is more than 10% of your ${categoryName} budget!`);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    setError('');
  };

  return (
    <div className="add-expense">
      <div className="add-expense-card">
        <h1>Add New Expense</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Expense Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Rent, Electricity Bill"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.emoji} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional details about the expense"
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className="add-expense-btn" disabled={loading}>
              {loading ? 'Adding...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;'''

# Create pages
pages = {
    'src/pages/Login.js': login_page,
    'src/pages/Dashboard.js': dashboard_page,
    'src/pages/AddExpense.js': add_expense_page
}

# Write page files
for file_path, content in pages.items():
    directory = os.path.dirname(file_path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created: {file_path}")

print("\n🏠 React Pages created successfully!")
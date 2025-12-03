import React, { useState } from 'react';
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

export default AddExpense;
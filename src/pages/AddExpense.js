import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { useNavigate } from 'react-router-dom';

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', marginLeft: '250px', maxWidth: '600px' }}>
      <div style={{
        backgroundColor: '#2d2d2d',
        borderRadius: '12px',
        padding: '2rem',
        border: '1px solid #404040'
      }}>
        <h1 style={{ color: '#ffffff', marginBottom: '2rem', textAlign: 'center' }}>
          Add New Expense
        </h1>

        {error && (
          <div style={{
            backgroundColor: '#ff4444',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>
              Expense Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Rent, Electricity Bill"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #404040',
                borderRadius: '8px',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #404040',
                borderRadius: '8px',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #404040',
                borderRadius: '8px',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                fontSize: '1rem'
              }}
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

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #404040',
                borderRadius: '8px',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional details about the expense"
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #404040',
                borderRadius: '8px',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={() => setFormData({
                title: '',
                amount: '',
                category: '',
                date: new Date().toISOString().split('T')[0],
                description: ''
              })}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 2,
                padding: '0.75rem',
                backgroundColor: '#20B2AA',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Adding...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
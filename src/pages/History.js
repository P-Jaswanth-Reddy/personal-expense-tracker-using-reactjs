import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import '../styles/History.css';

const History = () => {
  const { expenses, categories, deleteExpense } = useExpense();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const getCategoryEmoji = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.emoji : '📝';
  };

  const filteredAndSortedExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !filterCategory || expense.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.amount - a.amount;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default: // date
          return new Date(b.date) - new Date(a.date);
      }
    });

  const handleDelete = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(expenseId);
    }
  };

  return (
    <div className="history">
      <div className="history-header">
        <h1>Expense History</h1>

        <div className="history-filters">
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.emoji} {category.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="title">Sort by Title</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>

      <div className="expenses-list">
        {filteredAndSortedExpenses.length === 0 ? (
          <div className="no-expenses">
            <p>No expenses found matching your criteria.</p>
          </div>
        ) : (
          filteredAndSortedExpenses.map(expense => (
            <div key={expense.id} className="expense-item">
              <div className="expense-main">
                <div className="expense-category">
                  <span className="category-emoji">
                    {getCategoryEmoji(expense.category)}
                  </span>
                  <span className="category-name">{expense.category}</span>
                </div>

                <div className="expense-details">
                  <h3>{expense.title}</h3>
                  {expense.description && (
                    <p className="expense-description">{expense.description}</p>
                  )}
                  <div className="expense-meta">
                    <span className="expense-date">
                      {new Date(expense.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="expense-amount">
                  ₹{expense.amount.toLocaleString()}
                </div>

                <div className="expense-actions">
                  <button 
                    onClick={() => handleDelete(expense.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import '../styles/Categories.css';

const Categories = () => {
  const { categories, expenses, deleteCategory } = useExpense();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  const getCategoryExpenses = (categoryName) => {
    return expenses.filter(expense => expense.category === categoryName);
  };

  const handleDelete = async (categoryId, categoryName) => {
    if (window.confirm(`Are you sure you want to delete the ${categoryName} category?`)) {
      await deleteCategory(categoryId);
    }
  };

  return (
    <div className="categories">
      <div className="categories-header">
        <h1>Expense Categories</h1>
        <button className="add-category-btn">
          Add Category
        </button>
      </div>

      <div className="categories-grid">
        {categories.map(category => {
          const categoryExpenses = getCategoryExpenses(category.name);
          const totalSpent = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
          const progressPercentage = (totalSpent / category.budget) * 100;
          const isOverBudget = totalSpent > category.budget;

          return (
            <div key={category.id} className={`category-card ${isOverBudget ? 'over-budget' : ''}`}>
              <div className="category-header">
                <div className="category-icon">
                  <span className="category-emoji">{category.emoji}</span>
                  <h3>{category.name}</h3>
                </div>
                <div className="category-actions">
                  <button className="edit-btn">Edit</button>
                  <button 
                    onClick={() => handleDelete(category.id, category.name)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="category-budget">
                <div className="budget-info">
                  <span>Budget</span>
                  <span>₹{category.budget.toLocaleString()}</span>
                </div>

                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${isOverBudget ? 'over-budget' : ''}`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>

                <div className="spending-info">
                  <div className="spent-amount">
                    <span>Spent</span>
                    <span className={isOverBudget ? 'over-budget-text' : ''}>
                      ₹{totalSpent.toLocaleString()}
                    </span>
                  </div>
                  <div className="expenses-count">
                    <span>Expenses</span>
                    <span>{categoryExpenses.length}</span>
                  </div>
                </div>
              </div>

              {isOverBudget && (
                <div className="budget-alert">
                  <span>⚠️ Over budget by ₹{(totalSpent - category.budget).toLocaleString()}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
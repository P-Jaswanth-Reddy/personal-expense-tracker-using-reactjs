# Create remaining pages and CSS styles

# Categories Page
categories_page = '''import React, { useState } from 'react';
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

export default Categories;'''

# History Page
history_page = '''import React, { useState } from 'react';
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

export default History;'''

# Profile Page
profile_page = '''import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [income, setIncome] = useState(0);

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="user-info">
            <h2>User Information</h2>
            <div className="info-item">
              <label>Email:</label>
              <span>{currentUser?.email}</span>
            </div>
            {currentUser?.displayName && (
              <div className="info-item">
                <label>Name:</label>
                <span>{currentUser.displayName}</span>
              </div>
            )}
          </div>

          <div className="income-section">
            <h3>Monthly Income</h3>
            <div className="form-group">
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Enter monthly income"
                className="income-input"
              />
              <button className="save-btn">Save Income</button>
            </div>
          </div>

          <div className="actions-section">
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;'''

# Create remaining pages
remaining_pages = {
    'src/pages/Categories.js': categories_page,
    'src/pages/History.js': history_page,
    'src/pages/Profile.js': profile_page
}

# Write remaining page files
for file_path, content in remaining_pages.items():
    directory = os.path.dirname(file_path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created: {file_path}")

print("\n📄 All React Pages created successfully!")
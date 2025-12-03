import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';

const Categories = () => {
  const { categories, expenses, addCategory, updateCategory, deleteCategory } = useExpense();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    budget: '',
    budgetType: 'fixed'
  });

  const getCategoryExpenses = (categoryName) => {
    return expenses.filter(expense => expense.category === categoryName);
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      emoji: '',
      budget: '',
      budgetType: 'fixed'
    });
    setShowAddModal(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      emoji: category.emoji,
      budget: category.budget,
      budgetType: category.budgetType || 'fixed'
    });
    setShowEditModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.emoji || !formData.budget) {
      alert('Please fill in all fields');
      return;
    }

    const categoryData = {
      name: formData.name,
      emoji: formData.emoji,
      budget: parseFloat(formData.budget),
      budgetType: formData.budgetType
    };

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, categoryData);
        setShowEditModal(false);
        setEditingCategory(null);
      } else {
        await addCategory(categoryData);
        setShowAddModal(false);
      }

      setFormData({
        name: '',
        emoji: '',
        budget: '',
        budgetType: 'fixed'
      });
    } catch (error) {
      alert('Error saving category: ' + error.message);
    }
  };

  const handleDelete = async (categoryId, categoryName) => {
    if (window.confirm(`Are you sure you want to delete the ${categoryName} category?`)) {
      try {
        await deleteCategory(categoryId);
      } catch (error) {
        alert('Error deleting category: ' + error.message);
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      emoji: '',
      budget: '',
      budgetType: 'fixed'
    });
  };

  // Modal styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: '#2d2d2d',
    borderRadius: '12px',
    padding: '2rem',
    border: '1px solid #404040',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflow: 'auto'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #404040',
    borderRadius: '8px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    fontSize: '1rem',
    marginBottom: '1rem'
  };

  // Popular emojis for categories
  const popularEmojis = ['🏠', '✈️', '📚', '🗻', '🍽️', '🛍️', '🚗', '🏥', '🎬', '💊', '🎮', '🏋️', '📱', '👕', '⚡', '💡'];

  return (
    <div style={{ padding: '2rem', marginLeft: '250px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#ffffff' }}>Expense Categories</h1>
        <button 
          onClick={handleAdd}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#20B2AA',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1a9999'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#20B2AA'}
        >
          + Add Category
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {categories.map(category => {
          const categoryExpenses = getCategoryExpenses(category.name);
          const totalSpent = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
          const progressPercentage = (totalSpent / category.budget) * 100;
          const isOverBudget = totalSpent > category.budget;

          return (
            <div key={category.id} style={{
              backgroundColor: '#2d2d2d',
              borderRadius: '12px',
              padding: '1.5rem',
              border: isOverBudget ? '1px solid #ff4444' : '1px solid #404040',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{category.emoji}</span>
                  <h3 style={{ color: '#ffffff', margin: 0 }}>{category.name}</h3>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleEdit(category)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      backgroundColor: '#20B2AA',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1a9999'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#20B2AA'}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(category.id, category.name)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#cc3333'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ff4444'}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#cccccc' }}>
                <span>Budget</span>
                <span>₹{category.budget.toLocaleString()}</span>
              </div>

              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#404040',
                borderRadius: '4px',
                marginBottom: '1rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  backgroundColor: isOverBudget ? '#ff4444' : '#20B2AA',
                  width: `${Math.min(progressPercentage, 100)}%`,
                  transition: 'width 0.3s ease'
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#cccccc', fontSize: '0.9rem' }}>Spent</div>
                  <div style={{ color: isOverBudget ? '#ff4444' : '#ffffff', fontWeight: '500' }}>
                    ₹{totalSpent.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#cccccc', fontSize: '0.9rem' }}>Expenses</div>
                  <div style={{ color: '#ffffff', fontWeight: '500' }}>
                    {categoryExpenses.length}
                  </div>
                </div>
              </div>

              {isOverBudget && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.5rem',
                  backgroundColor: '#ff4444',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  color: 'white'
                }}>
                  ⚠️ Over budget by ₹{(totalSpent - category.budget).toLocaleString()}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add/Edit Category Modal */}
      {(showAddModal || showEditModal) && (
        <div style={modalOverlayStyle} onClick={handleCloseModal}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#ffffff', margin: 0 }}>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button 
                onClick={handleCloseModal}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Entertainment, Healthcare"
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>
                  Emoji
                </label>
                <input
                  type="text"
                  value={formData.emoji}
                  onChange={(e) => setFormData({...formData, emoji: e.target.value})}
                  placeholder="Choose an emoji"
                  style={inputStyle}
                  maxLength="2"
                  required
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {popularEmojis.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormData({...formData, emoji})}
                      style={{
                        padding: '0.5rem',
                        backgroundColor: formData.emoji === emoji ? '#20B2AA' : '#404040',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>
                  Budget (₹)
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="Enter budget amount"
                  style={inputStyle}
                  min="0"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
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
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#20B2AA',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  {editingCategory ? 'Update' : 'Add'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
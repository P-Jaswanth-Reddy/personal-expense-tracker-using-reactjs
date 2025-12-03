import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    <nav style={{
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      width: '250px',
      backgroundColor: '#2d2d2d',
      borderRight: '1px solid #404040',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{ borderBottom: '1px solid #404040', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <h2 style={{ color: '#20B2AA', textAlign: 'center' }}>Expense Tracker</h2>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ margin: '0.5rem 0' }}>
          <NavLink to="/dashboard" style={{ 
            display: 'block', 
            padding: '1rem', 
            color: '#cccccc', 
            textDecoration: 'none',
            borderRadius: '8px'
          }}>
            Dashboard
          </NavLink>
        </li>
        <li style={{ margin: '0.5rem 0' }}>
          <NavLink to="/categories" style={{ 
            display: 'block', 
            padding: '1rem', 
            color: '#cccccc', 
            textDecoration: 'none',
            borderRadius: '8px'
          }}>
            Categories
          </NavLink>
        </li>
        <li style={{ margin: '0.5rem 0' }}>
          <NavLink to="/add-expense" style={{ 
            display: 'block', 
            padding: '1rem', 
            color: '#cccccc', 
            textDecoration: 'none',
            borderRadius: '8px'
          }}>
            Add Expense
          </NavLink>
        </li>
        <li style={{ margin: '0.5rem 0' }}>
          <NavLink to="/history" style={{ 
            display: 'block', 
            padding: '1rem', 
            color: '#cccccc', 
            textDecoration: 'none',
            borderRadius: '8px'
          }}>
            History
          </NavLink>
        </li>
        <li style={{ margin: '0.5rem 0' }}>
          <NavLink to="/profile" style={{ 
            display: 'block', 
            padding: '1rem', 
            color: '#cccccc', 
            textDecoration: 'none',
            borderRadius: '8px'
          }}>
            Profile
          </NavLink>
        </li>
        <li style={{ margin: '2rem 0 0.5rem 0', borderTop: '1px solid #404040', paddingTop: '1rem' }}>
          <button onClick={handleLogout} style={{ 
            width: '100%',
            padding: '1rem', 
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
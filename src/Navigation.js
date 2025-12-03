import React from 'react';
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

export default Navigation;
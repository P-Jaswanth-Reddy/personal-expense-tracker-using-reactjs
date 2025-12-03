import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className="app-layout">
                      <Navigation />
                      <div className="main-content">
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/categories" element={<Categories />} />
                          <Route path="/add-expense" element={<AddExpense />} />
                          <Route path="/history" element={<History />} />
                          <Route path="/profile" element={<Profile />} />
                        </Routes>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
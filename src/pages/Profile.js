import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [income, setIncome] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Load existing income on component mount
  useEffect(() => {
    const loadUserIncome = async () => {
      if (!currentUser) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIncome(userData.income || '');
        }
      } catch (error) {
        console.error('Error loading user income:', error);
      }
    };

    loadUserIncome();
  }, [currentUser]);

  const handleSaveIncome = async () => {
    if (!currentUser) {
      setError('Please log in to save income');
      return;
    }

    if (!income || parseFloat(income) < 0) {
      setError('Please enter a valid income amount');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        income: parseFloat(income),
        incomeUpdatedAt: new Date()
      });

      setMessage('Income saved successfully! ✅');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error saving income:', error);
      setError('Failed to save income. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setError('Failed to logout. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem', marginLeft: '250px', maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: '600' }}>Profile</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          backgroundColor: '#2d2d2d',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid #404040',
          width: '100%',
          maxWidth: '500px'
        }}>
          {/* User Information Section */}
          <div style={{
            marginBottom: '2rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid #404040'
          }}>
            <h2 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.5rem' }}>
              User Information
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              padding: '0.5rem 0'
            }}>
              <span style={{ color: '#cccccc', fontWeight: '500' }}>Email:</span>
              <span style={{ color: '#ffffff' }}>{currentUser?.email}</span>
            </div>
            {currentUser?.displayName && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                padding: '0.5rem 0'
              }}>
                <span style={{ color: '#cccccc', fontWeight: '500' }}>Name:</span>
                <span style={{ color: '#ffffff' }}>{currentUser.displayName}</span>
              </div>
            )}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              padding: '0.5rem 0'
            }}>
              <span style={{ color: '#cccccc', fontWeight: '500' }}>User ID:</span>
              <span style={{ color: '#888888', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                {currentUser?.uid?.substring(0, 8)}...
              </span>
            </div>
          </div>

          {/* Monthly Income Section */}
          <div style={{
            marginBottom: '2rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid #404040'
          }}>
            <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.3rem' }}>
              Monthly Income
            </h3>

            {/* Success/Error Messages */}
            {message && (
              <div style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                textAlign: 'center',
                fontSize: '0.9rem'
              }}>
                {message}
              </div>
            )}

            {error && (
              <div style={{
                backgroundColor: '#ff4444',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                textAlign: 'center',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: '#cccccc',
                  fontSize: '0.9rem'
                }}>
                  Enter your monthly income (₹)
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => {
                    setIncome(e.target.value);
                    setError(''); // Clear error when user types
                    setMessage(''); // Clear success message when user types
                  }}
                  placeholder="e.g., 50000"
                  min="0"
                  step="100"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #404040',
                    borderRadius: '8px',
                    backgroundColor: '#1a1a1a',
                    color: '#ffffff',
                    fontSize: '1rem'
                  }}
                />
                {income && (
                  <div style={{ 
                    marginTop: '0.5rem', 
                    fontSize: '0.9rem', 
                    color: '#20B2AA' 
                  }}>
                    ₹{parseFloat(income || 0).toLocaleString()} per month
                  </div>
                )}
              </div>
              <button 
                onClick={handleSaveIncome}
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: loading ? '#666' : '#20B2AA',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  opacity: loading ? 0.6 : 1
                }}
                onMouseOver={(e) => {
                  if (!loading) e.target.style.backgroundColor = '#1a9999';
                }}
                onMouseOut={(e) => {
                  if (!loading) e.target.style.backgroundColor = '#20B2AA';
                }}
              >
                {loading ? 'Saving...' : 'Save Income'}
              </button>
            </div>

            <div style={{ 
              marginTop: '1rem', 
              fontSize: '0.8rem', 
              color: '#888',
              fontStyle: 'italic'
            }}>
              💡 Your income helps calculate budget percentages and provides better spending insights.
            </div>
          </div>

          {/* Account Actions Section */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              color: '#ffffff', 
              marginBottom: '1rem', 
              fontSize: '1.2rem' 
            }}>
              Account Actions
            </h3>
            <button 
              onClick={handleLogout}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#cc3333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ff4444'}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
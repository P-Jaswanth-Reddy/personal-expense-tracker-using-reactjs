import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#2d2d2d',
        borderRadius: '16px',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        border: '1px solid #404040'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#20B2AA', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
            Personal Expense Tracker
          </h1>
          <button 
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#20B2AA',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            Sign in with Google
          </button>
        </div>

        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#ffffff' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>

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
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#20B2AA',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
              disabled={loading}
            >
              {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <span style={{ color: '#cccccc' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#20B2AA',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
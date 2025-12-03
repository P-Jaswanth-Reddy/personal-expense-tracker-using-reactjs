import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

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
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Personal Expense Tracker</h1>
          <button 
            className="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            Sign in with Google
          </button>
        </div>

        <div className="login-form-section">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>

          <div className="toggle-mode">
            <span>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                className="toggle-btn"
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
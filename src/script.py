import os
import zipfile
from pathlib import Path

# Create the complete React.js project structure with all files
def create_react_project():
    
    # Project structure
    project_files = {}
    
    # Package.json
    project_files['package.json'] = '''{
  "name": "personal-expense-tracker",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "react-router-dom": "^6.8.1",
    "firebase": "^10.7.1",
    "chart.js": "^4.2.1",
    "react-chartjs-2": "^5.2.0",
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "date-fns": "^2.29.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}'''

    # public/index.html
    project_files['public/index.html'] = '''<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#20B2AA" />
    <meta
      name="description"
      content="Personal Expense Tracker with React.js and Firebase"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Personal Expense Tracker</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>'''

    # public/manifest.json
    project_files['public/manifest.json'] = '''{
  "short_name": "Expense Tracker",
  "name": "Personal Expense Tracker",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#20B2AA",
  "background_color": "#1a1a1a"
}'''

    # src/index.js
    project_files['src/index.js'] = '''import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);'''

    # src/index.css
    project_files['src/index.css'] = '''body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #1a1a1a;
  color: #ffffff;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

* {
  box-sizing: border-box;
}

#root {
  min-height: 100vh;
}'''

    # src/App.js
    project_files['src/App.js'] = '''import React from 'react';
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

export default App;'''

    # src/App.css
    project_files['src/App.css'] = '''/* App.css - Main styles for the expense tracker */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background-color: #1a1a1a;
  color: #ffffff;
  line-height: 1.6;
}

.App {
  min-height: 100vh;
  background-color: #1a1a1a;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 1rem;
  }
}

/* Loading styles */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #20B2AA;
}

/* Button styles */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn-primary {
  background-color: #20B2AA;
  color: white;
}

.btn-primary:hover {
  background-color: #1a9999;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #404040;
  color: white;
}

.btn-secondary:hover {
  background-color: #505050;
}

/* Card styles */
.card {
  background-color: #2d2d2d;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid #404040;
}

/* Form styles */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #ffffff;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #404040;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #20B2AA;
  box-shadow: 0 0 0 2px rgba(32, 178, 170, 0.2);
}

.error-message {
  background-color: #ff4444;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}

/* Responsive grid */
.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}'''

    return project_files

# Generate all project files
print("🚀 Creating Complete React.js Expense Tracker Project Structure...")
print("=" * 60)

project_files = create_react_project()

# Create directories and write files
for file_path, content in project_files.items():
    # Create directory if it doesn't exist
    directory = os.path.dirname(file_path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    
    # Write file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created: {file_path}")

print(f"\n📁 Created {len(project_files)} files successfully!")
print("📦 Basic project structure is ready!")
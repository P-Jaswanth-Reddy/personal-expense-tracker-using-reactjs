# Create CSS Styles for all components

# Login CSS
login_css = '''/* Login.css */

.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 2rem;
}

.login-card {
  background-color: #2d2d2d;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid #404040;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  color: #20B2AA;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.google-signin-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #20B2AA;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.google-signin-btn:hover {
  background-color: #1a9999;
  transform: translateY(-2px);
}

.login-form-section h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
  font-size: 1.5rem;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #20B2AA;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.login-btn:hover {
  background-color: #1a9999;
}

.login-btn:disabled {
  background-color: #666;
  cursor: not-allowed;
}

.toggle-mode {
  text-align: center;
  margin-top: 1.5rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: #20B2AA;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;
}

.toggle-btn:hover {
  color: #1a9999;
}'''

# Dashboard CSS
dashboard_css = '''/* Dashboard.css */

.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  color: #ffffff;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stats-card {
  background: linear-gradient(135deg, #2d2d2d 0%, #404040 100%);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #555;
  text-align: center;
  transition: transform 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
}

.stats-card-header h3 {
  font-size: 0.9rem;
  color: #cccccc;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stats-card-amount {
  font-size: 2.5rem;
  font-weight: bold;
  color: #20B2AA;
}

.stats-card-total .stats-card-amount {
  color: #20B2AA;
}

.stats-card-month .stats-card-amount {
  color: #36A2EB;
}

.stats-card-categories .stats-card-amount {
  color: #FFCE56;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

.chart-card {
  background-color: #2d2d2d;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #404040;
}

.chart-card h3 {
  margin-bottom: 1rem;
  color: #ffffff;
  text-align: center;
  font-size: 1.2rem;
}

.chart-container {
  height: 300px;
  position: relative;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-style: italic;
}'''

# Navigation CSS
navigation_css = '''/* Navigation.css */

.navigation {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  background-color: #2d2d2d;
  border-right: 1px solid #404040;
  z-index: 1000;
}

@media (max-width: 768px) {
  .navigation {
    width: 100%;
    height: auto;
    position: relative;
  }
}

.nav-header {
  padding: 2rem 1.5rem 1rem;
  border-bottom: 1px solid #404040;
}

.nav-header h2 {
  color: #20B2AA;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li {
  margin: 0;
}

.nav-link {
  display: block;
  padding: 1rem 1.5rem;
  color: #cccccc;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
}

.nav-link:hover {
  background-color: #404040;
  color: #20B2AA;
}

.nav-link.active {
  background-color: #20B2AA;
  color: white;
}

.logout-btn {
  margin-top: 2rem;
  border-top: 1px solid #404040;
}

.logout-btn:hover {
  background-color: #ff4444 !important;
  color: white !important;
}'''

# Add Expense CSS
add_expense_css = '''/* AddExpense.css */

.add-expense {
  max-width: 600px;
  margin: 0 auto;
}

.add-expense-card {
  background-color: #2d2d2d;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #404040;
}

.add-expense-card h1 {
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.reset-btn {
  flex: 1;
  padding: 0.75rem;
  background-color: #666;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background-color: #777;
}

.add-expense-btn {
  flex: 2;
  padding: 0.75rem;
  background-color: #20B2AA;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.add-expense-btn:hover {
  background-color: #1a9999;
}

.add-expense-btn:disabled {
  background-color: #666;
  cursor: not-allowed;
}'''

# Categories CSS
categories_css = '''/* Categories.css */

.categories {
  max-width: 1200px;
  margin: 0 auto;
}

.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.categories-header h1 {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 600;
}

.add-category-btn {
  padding: 0.75rem 1.5rem;
  background-color: #20B2AA;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.add-category-btn:hover {
  background-color: #1a9999;
  transform: translateY(-2px);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background-color: #2d2d2d;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #404040;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-3px);
}

.category-card.over-budget {
  border-color: #ff4444;
  box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.category-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-emoji {
  font-size: 1.5rem;
}

.category-icon h3 {
  color: #ffffff;
  font-size: 1.2rem;
  margin: 0;
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn {
  background-color: #20B2AA;
  color: white;
}

.edit-btn:hover {
  background-color: #1a9999;
}

.delete-btn {
  background-color: #ff4444;
  color: white;
}

.delete-btn:hover {
  background-color: #cc3333;
}

.budget-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #cccccc;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #404040;
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #20B2AA;
  transition: width 0.3s ease;
}

.progress-fill.over-budget {
  background-color: #ff4444;
}

.spending-info {
  display: flex;
  justify-content: space-between;
}

.spent-amount, .expenses-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
}

.spent-amount span:first-child,
.expenses-count span:first-child {
  color: #cccccc;
  margin-bottom: 0.2rem;
}

.spent-amount span:last-child,
.expenses-count span:last-child {
  color: #ffffff;
  font-weight: 500;
}

.over-budget-text {
  color: #ff4444 !important;
}

.budget-alert {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #ff4444;
  border-radius: 6px;
  text-align: center;
  font-size: 0.8rem;
  color: white;
}'''

# Create styles directory and write CSS files
styles = {
    'src/styles/Login.css': login_css,
    'src/styles/Dashboard.css': dashboard_css,
    'src/styles/Navigation.css': navigation_css,
    'src/styles/AddExpense.css': add_expense_css,
    'src/styles/Categories.css': categories_css
}

# Write CSS files
for file_path, content in styles.items():
    directory = os.path.dirname(file_path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created: {file_path}")

print("\n🎨 CSS Styles created successfully!")
print("\n" + "="*60)
print("🎉 COMPLETE REACT.JS PROJECT STRUCTURE CREATED!")
print("="*60)
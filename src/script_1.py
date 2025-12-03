# Create all the React components and Firebase configuration files

# Firebase Configuration
firebase_config = '''// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnwAyJ1vyy93RHNxEnPiOTc4UymGzEk-4",
  authDomain: "expense-tracker-daf3a.firebaseapp.com",
  projectId: "expense-tracker-daf3a",
  storageBucket: "expense-tracker-daf3a.firebasestorage.app",
  messagingSenderId: "349100784124",
  appId: "1:349100784124:web:0fec691ba37281fdc9da79",
  measurementId: "G-MN414S0XDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);

export default app;'''

# Authentication Context
auth_context = '''import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Create user document in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      email: result.user.email,
      createdAt: new Date(),
      income: 0
    });
    return result;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    // Check if user document exists, if not create one
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: new Date(),
        income: 0
      });
    }
    return result;
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};'''

# Expense Context
expense_context = '''import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { db } from '../firebase/config';

const ExpenseContext = createContext();

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Default categories with emojis
  const defaultCategories = [
    { name: 'Home', emoji: '🏠', budget: 50000, budgetType: 'fixed' },
    { name: 'Travel', emoji: '✈️', budget: 25000, budgetType: 'fixed' },
    { name: 'Studies', emoji: '📚', budget: 15000, budgetType: 'fixed' },
    { name: 'Trips', emoji: '🗻', budget: 30000, budgetType: 'fixed' },
    { name: 'Food', emoji: '🍽️', budget: 20000, budgetType: 'fixed' },
    { name: 'Shopping', emoji: '🛍️', budget: 15000, budgetType: 'fixed' }
  ];

  // Initialize default categories for new users
  const initializeCategories = async () => {
    if (!currentUser) return;

    const categoriesRef = collection(db, 'users', currentUser.uid, 'categories');
    const snapshot = await getDocs(categoriesRef);

    if (snapshot.empty) {
      // Add default categories
      for (const category of defaultCategories) {
        await addDoc(categoriesRef, {
          ...category,
          createdAt: new Date()
        });
      }
    }
  };

  // Real-time listeners
  useEffect(() => {
    if (!currentUser) return;

    initializeCategories();

    // Categories listener
    const categoriesRef = collection(db, 'users', currentUser.uid, 'categories');
    const categoriesQuery = query(categoriesRef, orderBy('createdAt', 'asc'));
    const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
      const categoriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoriesData);
    });

    // Expenses listener
    const expensesRef = collection(db, 'users', currentUser.uid, 'expenses');
    const expensesQuery = query(expensesRef, orderBy('date', 'desc'));
    const unsubscribeExpenses = onSnapshot(expensesQuery, (snapshot) => {
      const expensesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExpenses(expensesData);
      setLoading(false);
    });

    return () => {
      unsubscribeCategories();
      unsubscribeExpenses();
    };
  }, [currentUser]);

  // CRUD operations
  const addCategory = async (categoryData) => {
    if (!currentUser) return;
    const categoriesRef = collection(db, 'users', currentUser.uid, 'categories');
    await addDoc(categoriesRef, {
      ...categoryData,
      createdAt: new Date()
    });
  };

  const updateCategory = async (categoryId, categoryData) => {
    if (!currentUser) return;
    const categoryRef = doc(db, 'users', currentUser.uid, 'categories', categoryId);
    await updateDoc(categoryRef, categoryData);
  };

  const deleteCategory = async (categoryId) => {
    if (!currentUser) return;
    const categoryRef = doc(db, 'users', currentUser.uid, 'categories', categoryId);
    await deleteDoc(categoryRef);
  };

  const addExpense = async (expenseData) => {
    if (!currentUser) return;
    const expensesRef = collection(db, 'users', currentUser.uid, 'expenses');
    await addDoc(expensesRef, {
      ...expenseData,
      createdAt: new Date()
    });
  };

  const updateExpense = async (expenseId, expenseData) => {
    if (!currentUser) return;
    const expenseRef = doc(db, 'users', currentUser.uid, 'expenses', expenseId);
    await updateDoc(expenseRef, expenseData);
  };

  const deleteExpense = async (expenseId) => {
    if (!currentUser) return;
    const expenseRef = doc(db, 'users', currentUser.uid, 'expenses', expenseId);
    await deleteDoc(expenseRef);
  };

  const value = {
    categories,
    expenses,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
    addExpense,
    updateExpense,
    deleteExpense
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};'''

# Create directories and files
components_and_contexts = {
    'src/firebase/config.js': firebase_config,
    'src/context/AuthContext.js': auth_context,
    'src/context/ExpenseContext.js': expense_context
}

# Write the files
for file_path, content in components_and_contexts.items():
    directory = os.path.dirname(file_path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created: {file_path}")

print("\n🔥 Firebase and Context files created successfully!")
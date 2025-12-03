import React, { createContext, useContext, useState, useEffect } from 'react';
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

  const defaultCategories = [
    { name: 'Home', emoji: '🏠', budget: 50000, budgetType: 'fixed' },
    { name: 'Travel', emoji: '✈️', budget: 25000, budgetType: 'fixed' },
    { name: 'Studies', emoji: '📚', budget: 15000, budgetType: 'fixed' },
    { name: 'Trips', emoji: '🗻', budget: 30000, budgetType: 'fixed' },
    { name: 'Food', emoji: '🍽️', budget: 20000, budgetType: 'fixed' },
    { name: 'Shopping', emoji: '🛍️', budget: 15000, budgetType: 'fixed' }
  ];

  const initializeCategories = async () => {
    if (!currentUser) return;
    const categoriesRef = collection(db, 'users', currentUser.uid, 'categories');
    const snapshot = await getDocs(categoriesRef);
    if (snapshot.empty) {
      for (const category of defaultCategories) {
        await addDoc(categoriesRef, { ...category, createdAt: new Date() });
      }
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    initializeCategories();

    const categoriesRef = collection(db, 'users', currentUser.uid, 'categories');
    const categoriesQuery = query(categoriesRef, orderBy('createdAt', 'asc'));
    const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
      const categoriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoriesData);
    });

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

  const addCategory = async (categoryData) => {
    if (!currentUser) return;
    const categoriesRef = collection(db, 'users', currentUser.uid, 'categories');
    await addDoc(categoriesRef, { ...categoryData, createdAt: new Date() });
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
    await addDoc(expensesRef, { ...expenseData, createdAt: new Date() });
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
};
// Import the functions you need from the SDKs you need
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

export default app;
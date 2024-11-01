// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJZIsWKo6bKR-42VHidlno3oVlxVfrFi8",
  authDomain: "ai-lawyer-89139.firebaseapp.com",
  projectId: "ai-lawyer-89139",
  storageBucket: "ai-lawyer-89139.firebasestorage.app",
  messagingSenderId: "362780549215",
  appId: "1:362780549215:web:85fbbd5637de12cf19fbea",
  measurementId: "G-285TJEYE8V"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

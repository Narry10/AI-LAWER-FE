// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4oVLSGvPrYEOLXgFbDOdSPcVe8nJcqO0",
  authDomain: "vote-fpt.firebaseapp.com",
  databaseURL: "https://vote-fpt-default-rtdb.firebaseio.com",
  projectId: "vote-fpt",
  storageBucket: "vote-fpt.appspot.com",
  messagingSenderId: "574546107208",
  appId: "1:574546107208:web:397ef34ffce4528ab5717d",
  measurementId: "G-KF1P8J03VG"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
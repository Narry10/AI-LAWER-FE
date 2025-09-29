// Firebase Core config: Khởi tạo app Core, export auth và coreDb
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Thay bằng config thật của Core Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAnMhcPjtd3V4qH39-qg9W8I00opDvaM0",
  authDomain: "x-dashboa.firebaseapp.com",
  projectId: "x-dashboa",
  storageBucket: "x-dashboa.firebasestorage.app",
  messagingSenderId: "923391480763",
  appId: "1:923391480763:web:3377a6869bdb517e55aa9e",
  measurementId: "G-JVRTPG22M1"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

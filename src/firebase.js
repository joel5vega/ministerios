import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyy8GuqG9JZBgd-PUwz49El3NXguC5PLM",
  authDomain: "ministerios-b5a1b.firebaseapp.com",
  projectId: "ministerios-b5a1b",
  storageBucket: "ministerios-b5a1b.firebasestorage.app",
  messagingSenderId: "185394749243",
  appId: "1:185394749243:web:1220ce9e8bd6db8371e11e",
  measurementId: "G-C9YWNHPTJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
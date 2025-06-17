import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi9vo1DrJAqUy6oHbSNBSwEtyftewOV8I",
  authDomain: "netflixgpt-c7bb8.firebaseapp.com",
  projectId: "netflixgpt-c7bb8",
  storageBucket: "netflixgpt-c7bb8.firebasestorage.app",
  messagingSenderId: "971552059712",
  appId: "1:971552059712:web:e691f268c43a44fa6e8aa5",
  measurementId: "G-TT93XCJCS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();


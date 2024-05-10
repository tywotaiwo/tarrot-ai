
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBZ8eGCaLQ65TgYkUsADyV391JxGpG1l1Q",
  authDomain: "tarotai-708fa.firebaseapp.com",
  projectId: "tarotai-708fa",
  storageBucket: "tarotai-708fa.appspot.com",
  messagingSenderId: "719480765351",
  appId: "1:719480765351:web:0f8d1eef1d1d4b0c3e9482",
  measurementId: "G-1SRS9BLBZF"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


let analytics;
if (typeof window !== "undefined") {
  const { getAnalytics } = require("firebase/analytics");
  analytics = getAnalytics(app);
}


export { auth, db, analytics};

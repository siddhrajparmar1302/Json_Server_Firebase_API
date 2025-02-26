import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB38OMdSlmdWKJJvePoTX5H7rH_47DIZZ4",
  authDomain: "crud-firebase-api-8e3ac.firebaseapp.com",
  projectId: "crud-firebase-api-8e3ac",
  storageBucket: "crud-firebase-api-8e3ac.firebasestorage.app",
  messagingSenderId: "867026352086",
  appId: "1:867026352086:web:cbf485e384f96b8901d677"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, signInWithPopup, signOut };


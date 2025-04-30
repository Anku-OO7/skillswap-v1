// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// import dotenv from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// dotenv.config(); // load environment variables

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, 
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: "https://skillswap-9eb87-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const realtimeDB = getDatabase(app);
const firestoreDB = getFirestore(app);
const storage = getStorage(app);
setPersistence(auth, browserSessionPersistence)
    .then(() => {
      console.log("Session persistence enabled");
    })
    .catch((error) => {
      console.log("Error setting persistence:", error);
    });

export { app, auth, realtimeDB, firestoreDB, storage };
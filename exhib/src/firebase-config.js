import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyBCPYNEnvUxPAqAg4mSv1WTZKQY6oVF0Nk",
   authDomain: "exhib-7261b.firebaseapp.com",
   projectId: "exhib-7261b",
   storageBucket: "exhib-7261b.appspot.com",
   messagingSenderId: "920856673244",
   appId: "1:920856673244:web:23fbe271a6f71c6a4aad19",
   measurementId: "G-422B8739D7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage();

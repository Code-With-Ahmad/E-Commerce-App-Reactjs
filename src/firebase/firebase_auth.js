import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_Auth_Domain,
  projectId: import.meta.env.VITE_FIREBASE_Project_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_Storge_Bucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_Message_Sender_Id,
  appId: import.meta.env.VITE_FIREBASE_App_Id,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

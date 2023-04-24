import { apps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqQ140AoimlkJT-_MlyKWTDSAo2bhATRY",
  authDomain: "softskills-puzzle.firebaseapp.com",
  databaseURL: "https://softskills-puzzle-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "softskills-puzzle",
  storageBucket: "softskills-puzzle.appspot.com",
  messagingSenderId: "975338090757",
  appId: "1:975338090757:web:52f97f79f417c85f48c76c",
  measurementId: "G-9E332KQK57"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const fs = getFirestore(app)


export { auth, db ,fs }

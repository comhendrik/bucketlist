import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0MQ64fXZEqDZHkqit8BjMZ1UKapfqIt4",
  authDomain: "bucketlist-76679.firebaseapp.com",
  projectId: "bucketlist-76679",
  storageBucket: "bucketlist-76679.firebasestorage.app",
  messagingSenderId: "781763435622",
  appId: "1:781763435622:web:f185d0b7a44dca52d4a1a7"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDeezhyddNjZyOeo9MyuwOuhXvFCCScUzg",
  authDomain: "architect-studio-1810c.firebaseapp.com",
  projectId: "architect-studio-1810c",
  storageBucket: "architect-studio-1810c.firebasestorage.app",
  messagingSenderId: "1053914253758",
  appId: "1:1053914253758:web:97d9bc28ac5465730311ef",
  measurementId: "G-NN7GYSF55G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, doc, deleteDoc };
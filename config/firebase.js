import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, onSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4bcOs1lEPxH1lLoQ416GLbZp8ZtLa9UE",
  authDomain: "testarea-e0eeb.firebaseapp.com",
  projectId: "testarea-e0eeb",
  storageBucket: "testarea-e0eeb.appspot.com",
  messagingSenderId: "806269448099",
  appId: "1:806269448099:web:6916caa9f74b935df37416",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

const colRef = collection(db, "customerInfor");
//const updatRef = updateProfile(auth.currentUser);

//collecting data from the fire store

export { db, auth, colRef, storage };

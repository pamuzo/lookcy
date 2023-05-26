import { initializeApp, getApps, getApp } from "firebase/app";
import { collection, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {
  API_KEY,
  AUTH_DOMAIN,
  PRODUCT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PRODUCT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

//initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const auth = getAuth();
const storage = getStorage();

const colRef = collection(db, "customerInfor");
//const updatRef = updateProfile(auth.currentUser);

//collecting data from the fire store

export { db, auth, colRef, storage };

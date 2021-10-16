import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_AUTH_ODOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_MESSAGINGSENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_MEASUREMENT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const fbase = firebase;
export const fbaseAuth = firebase.auth();
export const fbaseFirestore = firebase.firestore();
export const fbaseStorage = firebase.storage();
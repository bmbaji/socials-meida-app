// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKpZykt1zwR9wC3o_TMHOEuo6yuYjJURc",
  authDomain: "social-media-app-f529e.firebaseapp.com",
  projectId: "social-media-app-f529e",
  storageBucket: "social-media-app-f529e.appspot.com",
  messagingSenderId: "592436968635",
  appId: "1:592436968635:web:6af54523aa763f18533d9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db =  getFirestore(app)
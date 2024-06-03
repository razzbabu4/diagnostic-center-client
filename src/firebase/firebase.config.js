// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWM1dBt_okpcjkaQn1jRMOhsDPHjqshI8",
  authDomain: "diagnostic-center-manage-f4ff1.firebaseapp.com",
  projectId: "diagnostic-center-manage-f4ff1",
  storageBucket: "diagnostic-center-manage-f4ff1.appspot.com",
  messagingSenderId: "477557532193",
  appId: "1:477557532193:web:2b1e3673475d4002d76560"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
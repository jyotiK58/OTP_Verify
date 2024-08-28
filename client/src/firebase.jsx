// firebase.js
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgsVbKMTm99ut1WoM-iv3hE8_QO46wAgQ",
  authDomain: "otpverification-2bd45.firebaseapp.com",
  projectId: "otpverification-2bd45",
  storageBucket: "otpverification-2bd45.appspot.com",
  messagingSenderId: "877381833387",
  appId: "1:877381833387:web:58301cf2c2cecd71e59dee",
  measurementId: "G-Z24Q9MD1NX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

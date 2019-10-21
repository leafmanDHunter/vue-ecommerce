import firebase from "@firebase/app";
// Required for firestore.
import "firebase/firestore";
//Import storage for file upload processing.
import "firebase/firebase-auth";
import "firebase/storage";

//This configuation file is coming from todos-andre database.
//Check later to change it when firebase console has resolved their error status 
/*
let firebaseConfig = {
  apiKey: "AIzaSyC1NcVhZmrzJMF95PeTvt9SJeZX_J6uqyQ",
  authDomain: "todos-andre.firebaseapp.com",
  databaseURL: "https://todos-andre.firebaseio.com",
  projectId: "todos-andre",
  storageBucket: "todos-andre.appspot.com",
  messagingSenderId: "166989271025",
  appId: "1:166989271025:web:514e1391c574e166"
};
*/
//configuration coming from joshuaikpefua9@gmail.com pwd Royalty25
let firebaseConfig = {
  apiKey: "AIzaSyBaJldp37UJmzl_fh19StV7Dzw_VOhqvww",
  authDomain: "vue-shop-1b2ab.firebaseapp.com",
  databaseURL: "https://vue-shop-1b2ab.firebaseio.com",
  projectId: "vue-shop-1b2ab",
  storageBucket: "vue-shop-1b2ab.appspot.com",
  messagingSenderId: "368349130891",
  appId: "1:368349130891:web:b479034e6967718a"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
//initialize FireStore
const db = firebase.firestore();

export {fb,db}
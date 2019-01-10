import * as firebase from "firebase";
// import { FirebaseConfig } from "../config/keys";

// todo:
// in the future, hide this firebase config object in env variable
const FirebaseConfig = {
   apiKey: "AIzaSyCrBj-KHfLScUqVU4ouGCtsM59zhEAuARI",
   authDomain: "cated-16470.firebaseapp.com",
   databaseURL: "https://cated-16470.firebaseio.com",
   projectId: "cated-16470",
   storageBucket: "cated-16470.appspot.com",
   messagingSenderId: "168590386823"
};

firebase.initializeApp(FirebaseConfig);

// const databaseRef = firebase.database().ref();
// use userRef to run crud for user
// export const userRef = databaseRef.child("user");
// export const fireDatabase = firebase.database();

const databaseRef = firebase.database().ref();
export const orderRef = databaseRef.child('order');
export const fireAuth = firebase.auth();
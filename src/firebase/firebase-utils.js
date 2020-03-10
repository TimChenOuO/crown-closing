import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// ---------------------------basic of firebase set up----
const config = {
    apiKey: "AIzaSyB2Aa-GDQPY9nW5dU8G2jw6fOWk44jt4PI",
    authDomain: "crown-test-f5381.firebaseapp.com",
    databaseURL: "https://crown-test-f5381.firebaseio.com",
    projectId: "crown-test-f5381",
    storageBucket: "crown-test-f5381.appspot.com",
    messagingSenderId: "511970249585",
    appId: "1:511970249585:web:df0a010de64ee724f144d0",
    measurementId: "G-1NE1D3CJX8"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// ------------------------------------------------------

// below code is what you config with google auth

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

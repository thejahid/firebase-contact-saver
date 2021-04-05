import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB85bvWQZl4Y7-krG2K0HBCaa9sr_lTpLo",
  authDomain: "contact-saver-developerjahid.firebaseapp.com",
  projectId: "contact-saver-developerjahid",
  storageBucket: "contact-saver-developerjahid.appspot.com",
  messagingSenderId: "397321605233",
  appId: "1:397321605233:web:393b1bb7a2ca8cb33a4bd0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//auth
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

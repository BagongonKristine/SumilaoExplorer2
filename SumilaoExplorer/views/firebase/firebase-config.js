// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfOI2shBJqKGaKAewR-X6XNoOzPYP1lpA",
  authDomain: "capstone-project-49ca8.firebaseapp.com",
  projectId: "capstone-project-49ca8",
  storageBucket: "capstone-project-49ca8.appspot.com",
  messagingSenderId: "132663616309",
  appId: "1:132663616309:web:f7f440409eefa5ac94a27c",
  measurementId: "G-ECQBJXEB2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
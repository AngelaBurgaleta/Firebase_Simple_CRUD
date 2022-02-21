import { initializeApp } from "firebase/app";
import {getFirestore} from  'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3UelS73q0aHWniR6h0hW08oARpCrj1Nc",
    authDomain: "fir-ejemplo-76559.firebaseapp.com",
    projectId: "fir-ejemplo-76559",
    storageBucket: "fir-ejemplo-76559.appspot.com",
    messagingSenderId: "985482611651",
    appId: "1:985482611651:web:3012cbd534ebb2b0588b76",
    measurementId: "G-2WK48YZ2BS"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);





// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAov1efWv3dUzJCEc24H7Gy2BGKxEO95N8",
  authDomain: "next-project-80230.firebaseapp.com",
  projectId: "next-project-80230",
  storageBucket: "next-project-80230.appspot.com",
  messagingSenderId: "520265763018",
  appId: "1:520265763018:web:ef5ef25ebddc9c3e608c33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
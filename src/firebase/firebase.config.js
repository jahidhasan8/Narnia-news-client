// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaI2hZxjlBJmQZWsRgOMwlNr3CIpNhzUo",
  authDomain: "narnia-news.firebaseapp.com",
  projectId: "narnia-news",
  storageBucket: "narnia-news.appspot.com",
  messagingSenderId: "466133666669",
  appId: "1:466133666669:web:16ca4beae6897e01446864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

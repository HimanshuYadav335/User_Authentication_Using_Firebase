// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // The following setting you can get from Firebase configration for react
  apiKey: "ADD YOUR API KEY",
  authDomain: "ADD AUTHDOMAIN",
  projectId: "ADD YOUR PROJECTID",
  storageBucket: "ADD YOUR STORAGEBUCKET",
  messagingSenderId: "ADD YOUR messagingSenderId",
  appId: "ADD YOUR APPID",
  measurementId: "ADD YOUR MEASUREMENTID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider=new GoogleAuthProvider();
const auth=getAuth(app);
export {auth,provider,app};

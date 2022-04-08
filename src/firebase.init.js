// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ_WXPRes_sxYtLnm7v6GbQ2P21qHDtkY",
  authDomain: "simple-login-auth-c1b3b.firebaseapp.com",
  projectId: "simple-login-auth-c1b3b",
  storageBucket: "simple-login-auth-c1b3b.appspot.com",
  messagingSenderId: "764076310979",
  appId: "1:764076310979:web:cf6c5abd084e4765097d76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
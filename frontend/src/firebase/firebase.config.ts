import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvGopF_8bepgYHEurTJljoFKaajMhuCQ8",
  authDomain: "diverse-blogs-67a97.firebaseapp.com",
  projectId: "diverse-blogs-67a97",
  storageBucket: "diverse-blogs-67a97.firebasestorage.app",
  messagingSenderId: "364952013844",
  appId: "1:364952013844:web:ecf4f16303e05e3a00eb01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAz-cvAkyUcacx8I6M8yfBT0zxoKWHu70I",
    authDomain: "blog-portfolio-app-4549c.firebaseapp.com",
    projectId: "blog-portfolio-app-4549c",
    storageBucket: "blog-portfolio-app-4549c.firebasestorage.app",
    messagingSenderId: "828356504132",
    appId: "1:828356504132:web:c9adbb8ff801e581512a11"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
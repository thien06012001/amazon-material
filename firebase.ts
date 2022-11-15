import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore/lite';
const firebaseConfig = {
    apiKey: "AIzaSyCoz0LrY5zJ8FOpsyWOb1QzTFGLiUQBM6I",
    authDomain: "material-80360.firebaseapp.com",
    projectId: "material-80360",
    storageBucket: "material-80360.appspot.com",
    messagingSenderId: "910644525955",
    appId: "1:910644525955:web:53b8dd950034f7dee994b6"
};

const app = initializeApp(firebaseConfig)
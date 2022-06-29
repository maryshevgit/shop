import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: 'AIzaSyBe-qbbjM9J_NLvmQ8smflE3oxyyYYDFqo',
    authDomain: "shop-f4c9c.firebaseapp.com",
    projectId: "shop-f4c9c",
    storageBucket: "shop-f4c9c.appspot.com",
    messagingSenderId: "787953843416",
    appId: "1:787953843416:web:917fd2dbb599ad90586bad"
  };

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
export const auth = getAuth()
export const storage = getStorage(app);
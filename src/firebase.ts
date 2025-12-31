import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "uploadingfile-7142a.firebaseapp.com",
  projectId: "uploadingfile-7142a",
  storageBucket: "uploadingfile-7142a.appspot.com",
  messagingSenderId: "121392413186",
  appId: "1:121392413186:web:d38010c64c9bfecb97c51b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
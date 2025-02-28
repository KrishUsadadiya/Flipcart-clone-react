import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRDPL3IlKrCFB2_vB1J6SxXjS4kbT_Qcs",
  authDomain: "flipcart-clone-react.firebaseapp.com",
  projectId: "flipcart-clone-react",
  storageBucket: "flipcart-clone-react.firebasestorage.app",
  messagingSenderId: "593261695133",
  appId: "1:593261695133:web:337a1f997246d6aa048474"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiMKRdBO8tNsLWP2THUMvDSbCCCc7ayoo",
  authDomain: "campus-rides-544d4.firebaseapp.com",
  projectId: "campus-rides-544d4",
  storageBucket: "campus-rides-544d4.firebasestorage.app",
  messagingSenderId: "129315125907",
  appId: "1:129315125907:web:b7cf094e92afa93a4b6b66"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIQYovnSOZk93DHTj87-KtYGnXNuJVIZQ",
  authDomain: "tutor-booking-system-2302b.firebaseapp.com",
  projectId: "tutor-booking-system-2302b",
  storageBucket: "tutor-booking-system-2302b.firebasestorage.app",
  messagingSenderId: "147198775132",
  appId: "1:147198775132:web:a140483701012182f2fb99",
  measurementId: "G-CWQMYR948K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
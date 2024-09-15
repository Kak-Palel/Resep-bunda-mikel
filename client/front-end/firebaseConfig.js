import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7p_nHB8OJYKjrL6oKEFsb0gojguQHChE",
  authDomain: "itsrecipe-d498b.firebaseapp.com",
  projectId: "itsrecipe-d498b",
  storageBucket: "itsrecipe-d498b.appspot.com",
  messagingSenderId: "677928018621",
  appId: "1:677928018621:web:768ccc6442ad898301cdd4",
  measurementId: "G-GT83SQ0KCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDue3kzatxVIAf6SwsmyR__WcP_xkbuZu4",
  authDomain: "chatapp-5214f.firebaseapp.com",
  projectId: "chatapp-5214f",
  storageBucket: "chatapp-5214f.appspot.com",
  messagingSenderId: "301441208747",
  appId: "1:301441208747:web:016e78c15acf358edd02ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const userAuth = getAuth(app);
const google = new GoogleAuthProvider()
const firebaseContext = createContext(null);

export const useFirebase = () => {
  return useContext(firebaseContext);
}
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const signInWithGoogle = async () => {
    return await signInWithPopup(userAuth, google);
  }
  useEffect(() => {
    onAuthStateChanged(userAuth, userImp => {
      console.log("user changing");
      if (userImp) {
        setUser(userImp);
      }
      else {
        setUser(null);
      }
    })
  }, [user]);
  const isLoggedIn = user ? true : false;
  return (
    <firebaseContext.Provider value={{ signInWithGoogle, user, isLoggedIn }}>
      {props.children}
    </firebaseContext.Provider>
  )
}
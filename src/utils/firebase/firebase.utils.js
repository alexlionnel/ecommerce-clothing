import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDvvQth7nLWS4zOiuWS-ZlFSJ0oTmYnaAA",
  authDomain: "cwrn-clothing-db-f1091.firebaseapp.com",
  projectId: "cwrn-clothing-db-f1091",
  storageBucket: "cwrn-clothing-db-f1091.appspot.com",
  messagingSenderId: "523826681957",
  appId: "1:523826681957:web:49371368867a5d1c300e8c",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) {
    return;
  }
  console.log('userAuth', userAuth);
  console.log('additionalInformation', additionalInformation);
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log('userDocRef', userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("userSnapshot", userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt, ...additionalInformation,
      });
    } catch (e) {
      console.log('error creating the user', e.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return createUserWithEmailAndPassword(auth, email, password);
};
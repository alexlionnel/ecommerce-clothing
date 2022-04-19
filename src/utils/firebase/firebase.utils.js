import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDvvQth7nLWS4zOiuWS-ZlFSJ0oTmYnaAA",
  authDomain: "cwrn-clothing-db-f1091.firebaseapp.com",
  projectId: "cwrn-clothing-db-f1091",
  storageBucket: "cwrn-clothing-db-f1091.appspot.com",
  messagingSenderId: "523826681957",
  appId: "1:523826681957:web:49371368867a5d1c300e8c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt,
      });
    } catch (e) {
      console.log('error creating the user', e.message);
    }
  }
  return userDocRef;
};
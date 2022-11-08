import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIe6vWviMoqeK66sTTTnki1qquZAGiPW4",
  authDomain: "crown-clothing-db-9efa3.firebaseapp.com",
  projectId: "crown-clothing-db-9efa3",
  storageBucket: "crown-clothing-db-9efa3.appspot.com",
  messagingSenderId: "670456746903",
  appId: "1:670456746903:web:77b38f9e15581c72c2ead2",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if (!userAuth) return;
    const userDocRef =  doc(db,'users',userAuth.uid);
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if (!userSnapShot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch(error) {
            console.log('Error creating user', error)
        }
    }

    return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email,password);
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email,password);
}

export const signOutUser = async () => {
   await signOut(auth);
}
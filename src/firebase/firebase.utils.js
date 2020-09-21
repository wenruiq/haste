import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAzbI-latTPODRIl3ATQbzDbEw5Mh-Z8h0",
  authDomain: "haste-a7139.firebaseapp.com",
  databaseURL: "https://haste-a7139.firebaseio.com",
  projectId: "haste-a7139",
  storageBucket: "haste-a7139.appspot.com",
  messagingSenderId: "884213693109",
  appId: "1:884213693109:web:5bafef0b252a62c18b9cfc"
};

// *Initialize firebase
firebase.initializeApp(config);

// *Auth
export const auth = firebase.auth();

// *Firestore
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export default firebase;
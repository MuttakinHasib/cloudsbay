import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCx5Z9t8Nc0vyh6FJjBeY8QzxSOfboJF7A',
  authDomain: 'cloudsbay-2a736.firebaseapp.com',
  projectId: 'cloudsbay-2a736',
  storageBucket: 'cloudsbay-2a736.appspot.com',
  messagingSenderId: '618028380031',
  appId: '1:618028380031:web:d53eaf7dc082229289b44a',
  measurementId: 'G-1VY0M0M7W0',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

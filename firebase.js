// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB05cQDWxM7aD5rT4UqXechyMbiC4JH9ek',
  authDomain: 'scooper-df18f.firebaseapp.com',
  databaseURL: 'https://scooper-df18f-default-rtdb.firebaseio.com',
  projectId: 'scooper-df18f',
  storageBucket: 'scooper-df18f.appspot.com',
  messagingSenderId: '383739983847',
  appId: '1:383739983847:web:3a991e16fef7a46be0af42',
  measurementId: 'G-58C4QVQBH7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyCwGMjrdMDxItBfYJkwuzIUuekqY1QAc_k',
  authDomain: 'theocratic-software.firebaseapp.com',
  projectId: 'theocratic-software',
  storageBucket: 'theocratic-software.appspot.com',
  messagingSenderId: '441138730087',
  appId: '1:441138730087:web:9877f590cadb16467af0c2',
  measurementId: 'G-KHGDKVZKNR',
};

const app = initializeApp(firebaseConfig);

export const fdb = getFirestore();
export const auth = getAuth(app);

if (import.meta.env.DEV) {
  connectFirestoreEmulator(fdb, "localhost", 8080);
  // connectAuthEmulator(auth, 'http://localhost:9099');
}

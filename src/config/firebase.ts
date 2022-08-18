import { initializeApp } from 'firebase/app';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut
} from 'firebase/auth';

import ENV from '../config/env';

const firebaseConfig = {
    apiKey: ENV.FIREBASE_API_KEY,
    authDomain: ENV.FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Gadgeon = 'Gadgeon-di9ey';
const Gmail = 'Gmail-8zl3y';
const Kore = 'Kore-49kfq';

const tenantId = Gadgeon;
auth.tenantId = tenantId;


const provider = new GoogleAuthProvider();

const signOutHandler = () => {
    signOut(auth).then(resp => {
        console.log('Sign out successfully', resp);
    }).catch((err => {
        console.log('Sign out error', err);
    }))
}

export { app, auth, onAuthStateChanged, signInWithEmailAndPassword, provider, signInWithPopup, signInWithRedirect, signOutHandler };
import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // create user with email-password
    const signUp = async(email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    // login with email-password
    const logIn = async(email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    }

    // observer
    useEffect(() => {
       const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('observing');
            setUser(currentUser);
        });

        return () => unSubscribe();
    },[])

    const authInfo = {
        user,
        signUp,
        logIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
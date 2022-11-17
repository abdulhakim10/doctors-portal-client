import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user with email-password
    const signUp = async(email, password, name) => {

        const profile = {
            displayName: name
        }
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, profile);
    }

    // login with email-password
    const logIn = async(email, password) => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
    }

    // logout 
    const logOut = async() => {
        await signOut(auth);
    }

    // observer
    useEffect(() => {
       const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('observing');
            setUser(currentUser);
            setLoading(false);
        });

        return () => unSubscribe();
    },[])

    const authInfo = {
        user,
        signUp,
        logIn,
        logOut,
        loading,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
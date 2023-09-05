import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';


const auth = getAuth(app)
export const AuthContext = createContext();

const UserContext = ({ children }) => {
    const [ user, setUser ] = useState({});
    const [ loading, setLoading ] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const createUser = ( email, password ) =>{
        return createUserWithEmailAndPassword( auth, email, password );
    }

    const signIn = ( email, password ) =>{
        return signInWithEmailAndPassword( auth, email, password );
    }

    const signInWithGoogle = () =>{
        return signInWithPopup( auth, googleProvider );
    }

    const logOut = () =>{
        return signOut(auth);
    }

    // why we are doing this
    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged( auth, currentUser => {
            setUser( currentUser );
            setLoading(false);
            console.log("Auth State Change", currentUser);
        })
        return () =>{
            unsubscribe();
        }
    }, [])

    const authInfo = { user, loading, createUser, signIn, logOut, signInWithGoogle };
    return (
        <AuthContext.Provider value={ authInfo }>
            { children }
        </AuthContext.Provider>
    );
};

export default UserContext;
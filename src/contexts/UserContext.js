import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebase.config';


const auth = getAuth(app)
export const AuthContext = createContext();

const UserContext = ({ children }) => {
    const [ user, setUser ] = useState({ displayName: 'akash' });

    const createUser = ( email, password ) =>{
        return createUserWithEmailAndPassword( auth, email, password );
    }

    const signIn = ( email, password ) =>{
        return signInWithEmailAndPassword( auth, email, password );
    }

    // why we are doing this
    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged( auth, currentUser => {
            setUser( currentUser );
        })
        return () =>{
            unsubscribe();
        }
    }, [])

    const authInfo = { user, createUser, signIn };
    return (
        <AuthContext.Provider value={ authInfo }>
            { children }
        </AuthContext.Provider>
    );
};

export default UserContext;
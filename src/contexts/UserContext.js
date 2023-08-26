import React, { createContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebase.config';


const auth = getAuth(app)
const AuthContext = createContext();

const UserContext = ({ children }) => {
    const [ user, setUser ] = useState({ displayName: 'akash' })
    const authInfo = { user: user }
    return (
        <AuthContext.Provider value={ authInfo }>
            { children }
        </AuthContext.Provider>
    );
};

export default UserContext;
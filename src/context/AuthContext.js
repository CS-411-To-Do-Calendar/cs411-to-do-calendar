import { useContext, createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    // signInWithPopup, 
    signInWithRedirect, 
    signOut, 
    onAuthStateChanged
} from "firebase/auth";
import { auth } from '../firebase'

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar');
        await signInWithRedirect(auth, provider);
    };

    const googleSignOut = () => {
        signOut(auth);
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {unsubscribe()}
    },[])

    return (
        <AuthContext.Provider value={{ googleSignIn, googleSignOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};

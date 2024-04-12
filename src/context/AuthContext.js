import { useContext, createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup, 
    // signInWithRedirect, 
    signOut, 
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from '../firebase'

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    // Getter and Setter for storing user data
    const [user, setUser] = useState({});
    // Getter and Setter for storing user cred
    const [ credentials, setCredentials] = useState({})
    
    // Signin function 
    const googleSignIn = async () => {
        // Using google auth provider,
        const provider = new GoogleAuthProvider();
        // get access to the google calendar scope. (Full access. Read write and execute)
        provider.addScope('https://www.googleapis.com/auth/calendar');
        // Pop up of all google accounts to choose 
        await signInWithPopup(auth, provider)
        // Whatever the result is, as long as result is not null, set the cred
        .then(result => {
            // result._tokenResponse.oauthAccessToken

            // check if result is null or not

            // if it is not then you do the following:
            
            // if (!userExist(uid))
                // then you can add user with oauthToken here
            // Else
                // the user exist so update user oauthToken here


            result && setCredentials(result);
        })
        // Shit fails then throw error
        .catch(error => {
            console.error(error)
        })
    };

    // Just signout function
    const googleSignOut = () => {
        signOut(auth);
    }

    // When the Auth changes, set the user as current auth
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {unsubscribe()}
    },[])

    // If you look at App.js, it is router container. anything enclosed by "AuthContextProvider" tag can access "googleSignIn, googleSignOut, user, credentials" functions/data!
    return (
        <AuthContext.Provider value={{ googleSignIn, googleSignOut, user, credentials }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};

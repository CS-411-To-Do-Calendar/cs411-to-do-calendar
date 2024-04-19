import { useContext, createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    // signInWithRedirect, 
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from '../firebase'
import { userExist, setUserOauthToken } from '../firestore/firebaseUser.js'
import { createTask } from "../firestore/firebaseTask.js";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // Getter and Setter for storing user data
    const [user, setUser] = useState({});

    // Signin function 
    const googleSignIn = async () => {
        // Using google auth provider,
        const provider = new GoogleAuthProvider();
        // get access to the google calendar scope. (Full access. Read write and execute)
        provider.addScope('https://www.googleapis.com/auth/calendar');
        // Pop up of all google accounts to choose 
        await signInWithPopup(auth, provider)
            // Whatever the result is, as long as result is not null, set the cred
            // Inside your googleSignIn function:
        .then(async result => {
            const uid = result.user.uid;
            console.log("UID: ", uid);  // Log UID to ensure it's correct
            if (await userExist(uid)) {
                await setUserOauthToken(uid, result._tokenResponse.oauthAccessToken);
                console.log("User exists, token updated.");
            } else {
                await setUserOauthToken(uid, result._tokenResponse.oauthAccessToken);
                console.log("User does not exist, creating task.");
                await createTask(uid, 0);
            }
        })
        .catch(error => {
            console.error(error)
        })
    };

    // Just signout function
    const googleSignOut = () => {
        signOut(auth);
    }

    // When the Auth changes, set the user as current auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => { unsubscribe() }
    }, [])

    // If you look at App.js, it is router container. anything enclosed by "AuthContextProvider" tag can access "googleSignIn, googleSignOut, user, credentials" functions/data!
    return (
        <AuthContext.Provider value={{ googleSignIn, googleSignOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};

import { useContext, createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    // signInWithRedirect, 
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from '../firebase'
import { userExist, setUserOauthToken, addUser } from '../firestore/firebaseUser.js'
import { createTask } from "../firestore/firebaseTask.js";
import { setTodo } from "../firestore/firebaseTodo.js";
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // Getter and Setter for storing user data
    const [user, setUser] = useState({});
    const navigateTo = useNavigate();

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
            if (await userExist(result.user.uid)) {
                await setUserOauthToken(result.user.uid, result._tokenResponse.oauthAccessToken);
                console.log("User exists, token updated.");
                navigateTo('/Account');
            } else {
                await setUserOauthToken(result.user.uid, result._tokenResponse.oauthAccessToken);
                await createTask(result.user.uid, 0);
                await setTodo(result.user.uid, []);
                alert("Welcome!");
                navigateTo('/tutorial');
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

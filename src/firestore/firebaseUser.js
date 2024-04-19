import React from 'react'
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    query,
    where,
    onSnapshot,
    updateDoc, 
    setDoc
} from 'firebase/firestore';
import { db } from '../firebase.js'
import {auth} from '../firebase.js'
const userCollectionRef = collection(db, "user")



export const userExist = async ( uid ) => {
    //querysnapshot gets all the docs from the collection
    const querySnapshot = await getDocs(userCollectionRef);
    // console.log(uid)
    //loop through all the docs till we find the user's doc then return 
    for (const docSnapshot of querySnapshot.docs)
     {
        // console.log("---------------------------")
        // console.log(docSnapshot._document.data.value.mapValue.fields.uid === uid)
        // console.log("---------------------------")
        const userData = docSnapshot.data();
        if (userData.uid === uid) {
            console.log("reached")
            return true;
        }
    }
    return false;
    //return null if we didn't find any doc with matching uid
}


export const addUser = async (uid, oauthToken) => {
    const docRef = await addDoc(userCollectionRef,
        {
            "uid": uid,
            "OauthToken": oauthToken
        }
    );
}


export const setUserOauthToken = async (uid, oauthToken) => {

    const userDocRef = doc(db, 'user', uid);
    await setDoc(userDocRef,
    {
        "uid": uid, 
        "OauthToken" : oauthToken
    }, 
    {
        merge:true
    });
}




// export const setUserOauthToken = async (uid, oauthToken) => {
//     try {
//         // Check if oauthToken is defined
//         if (oauthToken === undefined) {
//             throw new Error('OAuth token is undefined');
//         }

//         const userDocRef = doc(db, 'user', uid); // Assuming 'user' is your collection name
//         await setDoc(userDocRef, { uid, OauthToken: oauthToken }); // Set the document with the new OAuth token
//         console.log('User OAuth token updated successfully');
//     } catch (error) {
//         console.error('Error setting user OAuth token:', error);
//         throw error;
//     }
// };


export const getUserOauthToken = async (uid) => {
    const docRef = await getDoc(userCollectionRef,
        {
            "uid": uid
        }
    );

}








// export const addNewDeck = async (uid: String, titleInput: String) => {
//     const docRef = await addDoc(decksCollectionRef, {
//       author: doc(db, "/users/" + uid),
//       title: titleInput,
//       playlist: [],
//       // bleedQueue: CardNode,
//       // bleedQueueLength: 0
//     }
//     );
//     console.log("Document written with ID: ", docRef.id);
//     return docRef.id;
// }
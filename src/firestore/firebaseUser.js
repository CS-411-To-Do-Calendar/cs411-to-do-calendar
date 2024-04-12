import React from 'react'
import { 
    collection, 
    getDocs, 
    addDoc, 
    deleteDoc, 
    doc, 
    updateDoc, 
    getDoc,
    query, 
    where 
} from 'firebase/firestore';
import { db } from '../firebase.js'

const userCollectionRef = collection(db, "user")



export const userExist = async (uid) => {
    const docRef = await getDocs(userCollectionRef,
        {
            //
        }
    );
}
export const addUser = async (uid, oauthToken) => {
    const docRef = await addDoc(userCollectionRef,
        {
            //
        }
    );
}
export const setUserOauthToken = async (uid, oauthToken) => {
    const docRef = await updateDoc(userCollectionRef,
        {
            //
        }
    );
}

export const getUserOauthToken = async (uid) => {
    const docRef = await getDoc(userCollectionRef,
        {
            //
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
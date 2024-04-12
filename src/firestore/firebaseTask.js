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

const taskCollectionRef = collection(db, "task")

export const addTaskData = async ( uid ) => {
    // addDoc
}

export const getTaskData = async ( uid ) => {
    // getDoc
}

export const setTaskData = async ( uid, todayTD, done, upcomingTD ) => {
    // updateDoc
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
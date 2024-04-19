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
    where, 
    setDoc
} from 'firebase/firestore';
import { db } from '../firebase.js'

const taskCollectionRef = collection(db, "task")

export const addTaskData = async ( uid ) => {
    // addDoc
}

export const getTaskData = async ( uid ) => {
    // getDoc
}

// export const setTaskData = async ( uid, Done ) =>
//  {
//     const userDocRef = doc(db, 'task', uid);
//     await setDoc(userDocRef,
//         {
//             "uid": uid, 
//             "done" : Done + 1
//         }, 
//         {
//             merge:true
//         });
// }

export const getDone = async (uid) => {
    const q = query(collection(db, 'task'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    let done;
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        done = data.done;
    });
    return done;
}


export const setDone = async (uid, Done) => 
{
    const userDocRef = doc(db, 'task', uid);
    await setDoc(userDocRef,
        {
            "uid": uid,
            "done" : Done
        } 
)
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
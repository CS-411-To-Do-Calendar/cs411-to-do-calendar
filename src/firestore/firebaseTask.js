import { 
    collection, 
    getDocs, 
    doc, 
    query, 
    where, 
    setDoc
} from 'firebase/firestore';
import { db } from '../firebase.js'

const taskCollectionRef = collection(db, "task");

export const createTask = async (uid, done) => {
    const taskDocRef = doc(db, 'task', uid);
    try {
        await setDoc(taskDocRef, {
            uid: uid,
            done: done
        }, { merge: true });
        console.log("Task created/updated for UID:", uid);
    } catch (error) {
        console.error("Failed to create/update task:", error);
    }
}



export const getDone = async (uid) => {
    const q = query(taskCollectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    let done;
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        done = data.done;
    });
    return done;
}


export const setDone = async (uid, done) => 
{
    const taskDocRef = doc(db, 'task', uid);
    await setDoc(taskDocRef,
        {
            "uid": uid,
            "done" : done
        } 
    )
}

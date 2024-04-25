import {
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';
import { db } from '../firebase.js'
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
    await addDoc(userCollectionRef,
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

export const getUserOauthToken = async (uid) => {
    const userDocRef = doc(db, 'user', uid);
    const docSnap = await getDoc(userDocRef);
    const userData = docSnap.data();
    return await userData.OauthToken;
}

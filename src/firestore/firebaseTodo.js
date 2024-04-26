import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  where,
  query,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase.js';

const todoCollectionRef = collection(db, "todo");

export const setTodo = async (uid, arr) => {
  const todoDocRef = doc(db, 'todo', uid);
  await setDoc(todoDocRef, 
    {
      "uid": uid, 
      "task": arr
    },
    {
      merge: true
    }
  );
};

export const getTodo = async (uid) => {
  const q = query(todoCollectionRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  let todos = [];
  querySnapshot.forEach((doc) => {
    todos.push(doc.data());
  });
  return todos.length ? todos[0].task : [];
};

export const createTopic = async (uid, topicName) => {
  const todo = await getTodo(uid);
  const newTopic = {
    topic: topicName,
    subTopic: []
  };
  await setTodo(uid, [...todo, newTopic]);
};

export const removeTopic = async (uid, topicName) => {
  const todo = await getTodo(uid);
  const filteredTodos = todo.filter(item => item.topic !== topicName);
  await setTodo(uid, filteredTodos);
};

export const createSubTopic = async (uid, topicName, subTopicName) => {
  const todo = await getTodo(uid);
  const updatedTodo = todo.map(item => {
    if (item.topic === topicName) {
      return {...item, subTopic: [...item.subTopic, subTopicName]};
    }
    return item;
  });
  await setTodo(uid, updatedTodo);
};

export const removeSubTopic = async (uid, topicName, subTopicName) => {
  const todo = await getTodo(uid);
  const updatedTodo = todo.map(item => {
    if (item.topic === topicName) {
      return {...item, subTopic: item.subTopic.filter(sub => sub !== subTopicName)};
    }
    return item;
  });
  await setTodo(uid, updatedTodo);
};
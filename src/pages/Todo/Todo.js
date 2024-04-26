
import React, {useState, useEffect} from 'react'
import { UserAuth } from '../../context/AuthContext';

import './Todo.css'
import Organizer from './Organizer/Organizer';
import Navbar from '../../componets/Navbar/Navbar';
import { getTodo, createTopic, createSubTopic } from '../../firestore/firebaseTodo';
function Todo() {
  const { user } = UserAuth();
  const [topicName, setTopicName] = useState('');
  const [subTopicName, setSubTopicName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [refresh, setRefresh] = useState(false);  // State to trigger re-fetch

  const fetchTodoList = async () => {
    if (user && user.uid) {
      try {
        const fetchedTodos = await getTodo(user.uid);
        setTodoList(fetchedTodos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, [user, refresh]);  // Depend on user and refresh flag

  const handleAddTopic = async () => {
    if (topicName && user) {
      try {
        await createTopic(user.uid, topicName);
        setTopicName('');
        setRefresh(prev => !prev);  // Toggle the refresh flag
      } catch (error) {
        console.error('Failed to add topic:', error);
      }
    }
  };

  const handleAddSubTopic = async () => {
    if (selectedTopic && subTopicName && user) {
      try {
        await createSubTopic(user.uid, selectedTopic, subTopicName);
        setSubTopicName('');
        setRefresh(prev => !prev);  // Toggle the refresh flag
      } catch (error) {
        console.error('Failed to add subtopic:', error);
      }
    }
  };
  return (
    <div className='todo-page-container'>
      <Navbar />
      <div className='account-calendar-container'>
        <div className='account-calendar-horizonal-line'/>
        <div className='account-calendar-component-container'>
          <Organizer todoArr={todoList} fetchTodoList={fetchTodoList}/>
          <div className='todo-adder-container'>
            <div>
                <div>Add Topic</div>
                <input 
                  type="text"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="Enter topic name"
                /> 
                <button onClick={handleAddTopic}>Add Topic</button>
            </div>
            <div>
              <div>Add Sub Topic</div>
              <input 
                type="text"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                placeholder="Enter existing topic name"
              /> 
              <input 
                type="text"
                value={subTopicName}
                onChange={(e) => setSubTopicName(e.target.value)}
                placeholder="Enter subtopic name"
              />
              <button onClick={handleAddSubTopic}>Add Sub Topic</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
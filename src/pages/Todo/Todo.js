
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
      <div className='todo-container'>
        <div className='todo-horizonal-line'/>
        <div className='todo-component-container'>
          <div className='organizer-component-container'>
          <Organizer todoArr={todoList} fetchTodoList={fetchTodoList}/>
          </div>
          <div className='todo-adder-container'>
            <div className='add-topic-container'>
                <div className='add-topic-title'>Add Topic</div>
                <div className='add-topic-content-container'>
                  <input className='add-topic-input'
                  type="text"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="Enter topic name"
                  /> 
                  <button className="add-topic-button" onClick={handleAddTopic}>Add Topic</button>
                </div>
            </div>
            <div className='add-subtopic-container'>
            
              <div className='add-subtopic-title'>Add Sub Topic</div>
              <div className='add-subtopic-content-container'>
              <input  className='add-subtopic-input'
                type="text"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                placeholder="Enter existing topic name"
              /> 
              <button className="add-subtopic-button" onClick={handleAddSubTopic}>Add Sub Topic</button>
              </div>
              <div className='add-subtopic-name-container'>
              <input className='add-subtopic-input'
                type="text"
                value={subTopicName}
                onChange={(e) => setSubTopicName(e.target.value)}
                placeholder="Enter subtopic name"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
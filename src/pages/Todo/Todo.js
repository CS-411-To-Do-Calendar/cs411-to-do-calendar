import React, { useState, useCallback, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { CalendarComponent } from "@syncfusion/ej2-react-calendars";

// Firebase!
import { UserAuth } from '../../context/AuthContext';

// Calendar imports
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Img 
import img_google from '../../assets/google.png';

//CSS
import './Todo.css';
import '../Account/Account.css';

// Icons
import { RxCalendar } from "react-icons/rx";
import { MdChecklistRtl } from "react-icons/md";
import { LuUsers, LuSettings } from "react-icons/lu";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

import { Navigate } from 'react-router-dom';

// Todo imports
import moment from 'moment'

function Todo() {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [tdList, setTdList] = useState([]);
  const [topics, setTopics] = useState({});

  const [todoDate, setTodoDate] = useState('');
  // const [date, updateDate] = useState(new Date());
  // const [days, setDays] = useState(date.getDate());

  const format = 'MMMM Do';
  const [date, updateDate] = useState(moment(new Date(), format));
  console.log(date);
  
  // Increase date
  const incrementDate = useCallback(() => {
    updateDate(prevState => moment(prevState, format).add(1, "day"));
  }, []);
  
  // Decrease date
  const decrementDate = useCallback(() => {
    updateDate(prevState => moment(prevState, format).subtract(1, "day"));
  }, []);

  // Today's date
  const todayDate = () =>{
    updateDate(moment(new Date(), format));
  }; 

  
  // const incrementDate = useCallback(() => {
  //   setDays(prevState => prevState + 1);
  // }, []);
  
  
  // const decrementDate = useCallback(() => {
  //   setDays(prevState => prevState - 1);
  // }, []);
  
  // useEffect(() => {
  //   updateDate(prevState => new Date(Date.now() + days * 24 * 60 * 60 * 1000));
  // }, [days, updateDate])

  //Get today's date
  var today = new Date();
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var month = months[today.getMonth()];
  var dateVal = today.getDate();
  var formattedTodayDate = month + ' ' + dateVal;
  
  // Create a new to-do topic
  const createNewTopic = async (topic) => {
    setTopics({...topics, [topic]: []});
  };

  const handleTodayEvents = () => { 
    // Change Todo list to today's date
  };

  // setTodoDate(formattedTodayDate);


  return (
    // <div>Todo</div>
    <div className='todo-page-container'>

      {/* Left hand side */}
      <div className='navigate-menu-container'>
          <div className='account-menu-user-greet-container'>
            <img src={img_google} alt='user-icon' className='account-menu-user-greet-icon'/>
            <div className='account-menu-user-greet-text'>Hello {user?.displayName},</div>
          </div>
          <div className='account-menu-control-container'>
            <div className='account-menu-control-child-container' onClick={() => navigate('/account')}>
              <RxCalendar className='account-menu-control-child-icon'/>
              <div>Calendar</div>
            </div>
            <div className='account-menu-control-child-container active' onClick={() => navigate('/todo')}>
              <MdChecklistRtl className='account-menu-control-child-icon'/>
              <div>To do List</div>
            </div>
            <div className='account-menu-control-child-container' onClick={() => navigate('/chatbot')}>
              <LuUsers className='account-menu-control-child-icon'/>
              <a href='/chatbot'>CHATGPT</a>
            </div>
            <div className='account-menu-control-child-container' onClick={() => navigate('/')}>
              <LuSettings className='account-menu-control-child-icon'/>
              <div>Setting</div>
            </div>
          </div>
        </div>

      {/* To-do list view */}
      <div className='todolist-container'>
        <div className='todolist-horizonal-line'></div>
        <div className='todolist-component-container'>
          <div className='todolist-main-container'>
            <button className='today-button' onClick={todayDate}>Today</button>
            <div className='todolist-item-container'>
              <div className='todolist-item-style task-container'>
                <div className='day-navi-container'>
                  <button className='day-navi-button left' onClick={decrementDate}>
                    <AiOutlineArrowLeft className='icon'></AiOutlineArrowLeft>
                  </button>

                  <div className='date'>{date.format(format)}</div>
                  
                  <button className='day-navi-button right' onClick={incrementDate}>
                    <AiOutlineArrowRight className='icon'></AiOutlineArrowRight>
                  </button>
                </div>
                <div className='task-stack-container'>
                  <div className='newlist-container'></div>
                  <div className='Todolist-stack-container'></div>
                </div>
              </div>
              <div className='todolist-item-style progress-container'>hi</div>
            </div>
          </div>
          {/* Widget */}
          <div className='todolist-widget-container'></div>
        </div>
      </div>
    </div>
  )
}

export default Todo
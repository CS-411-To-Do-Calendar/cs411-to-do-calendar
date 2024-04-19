import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Firebase!
import { UserAuth } from '../../context/AuthContext';

// Img 
import img_google from '../../assets/google.png';

//CSS
import './Todo.css';
import '../Account/Account.css';

// Icons
import { RxCalendar } from "react-icons/rx";
import { MdChecklistRtl } from "react-icons/md";
import { LuUsers, LuSettings } from "react-icons/lu";
import { Navigate } from 'react-router-dom';

function Todo() {
  const { user } = UserAuth();
  const navigate = useNavigate();

  return (
    // <div>Todo</div>
    <div className='todo-page-container'>

      {/* Left hand side */}
      <div className='account-menu-container'>
          <div className='account-menu-user-greet-container'>
            <img src={img_google} alt='user-icon' className='account-menu-user-greet-icon'/>
            <div className='account-menu-user-greet-text'>Hello {user?.displayName},</div>
          </div>
          <div className='account-menu-control-container'>
            <div className='account-menu-control-child-container' onClick={() => navigate('/account')}>
              <RxCalendar className='account-menu-control-child-icon'/>
              <div>Calendar</div>
            </div>
            <div className='account-menu-control-child-container' onClick={() => navigate('/todo')}>
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
      <div>

      </div>
    </div>
  )
}

export default Todo
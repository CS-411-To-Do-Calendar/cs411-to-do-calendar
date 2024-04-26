import React from 'react'
import './Todo.css'
import Organizer from './Organizer/Organizer';
import Navbar from '../../componets/Navbar/Navbar';


function Todo() {

  return (
    // <div>Todo</div>
    <div className='todo-page-container'>
      <Navbar />
      <div className='account-calendar-container'>
        <div className='account-calendar-horizonal-line'/>
        <div className='account-calendar-component-container'>
          <Organizer />
          
        </div>
      </div>
    </div>
  )
}

export default Todo
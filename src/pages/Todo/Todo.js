import React from 'react'
import './Todo.css'
import Organizer from './Organizer/Organizer';
import Navbar from '../../componets/Navbar/Navbar';


function Todo() {

  return (
    // <div>Todo</div>
    <div className='todo-page-container'>
      <Navbar />
      <Organizer />
    </div>
  )
}

export default Todo
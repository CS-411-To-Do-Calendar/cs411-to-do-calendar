import React from 'react'
import Topic from '../../../componets/Topic/Topic'


// CSS
import './Organizer.css'

function Organizer({todoArr, fetchTodoList}) {
  // Array of task
  // Topic is going to take task[0], task[1], task[2], ....
  return (
    <div className='organizer-container'>
      <div className='organizer-header-container'>
        <div className='organizer-header-title'>To - Do List</div>
      </div>
      {
        todoArr.map((key) => {
        return <Topic objCol={key} fetchTodoList={fetchTodoList}/>
        })
      }
    </div>
  )
}

export default Organizer
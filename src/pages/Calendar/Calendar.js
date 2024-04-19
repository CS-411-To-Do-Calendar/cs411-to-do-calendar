import React from 'react'
import '../../App.css'
import './Calendar.css'


function Calendar({props}) {
    
    return (
        <div className='todolist-popup-container'>
            <div className='priority-todo-container'>
                <div>Priority To-Do</div>
                <div className='today'></div>
                <div className='tomorrow'></div>
                <div className='upcoming'></div>
            </div>
            <div className='activity'></div>
            <div className='progress'></div>
        </div>
    )

}

export default Calendar
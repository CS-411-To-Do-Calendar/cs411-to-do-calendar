import React from 'react'
import '../../App.css'
import './Calendar.css'


function Calendar({props}) {
    
    return (
        <div classname='todolist-popup-container'>
            <div classname='priority-todo-container'>
                <div>Priority To-Do</div>
                <div classname='today'></div>
                <div classname='tomorrow'></div>
                <div classname='upcoming'></div>
            </div>
            <div classname='activity'></div>
            <div classname='progress'></div>
        </div>
    )

}

export default Calendar
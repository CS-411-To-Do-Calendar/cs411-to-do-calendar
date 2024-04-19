import React from 'react';
import './Progress.css';
// import {total} from "react-big-calendar/lib/utils/dates";

//Progress takes 3 inputs and calculates percentages to display a
//Progress bar on the screen, is exported to Account.js
const Progress = ({completedEvents, todayTodo, upcomingTodo}) => {
    //calculate total tasks
    const totalTasks = completedEvents + todayTodo + upcomingTodo;

    //calcualte percentage of each category
    const completedPercentage = (completedEvents / totalTasks) * 100;
    const todayTodoPercentage = (todayTodo / totalTasks) * 100;
    const upcomingTodoPercentage = (upcomingTodo / totalTasks) * 100;

    return (
        <div className = 'container'>
            <div id='header-style'>Progress</div>
            <div className="progress-container">
                <div className='bar-parent'>
                    <div
                        className="progress-bar completed"
                        style={{ width: `${completedPercentage}%` }}
                    />
                    <div
                        className="progress-bar today-to-do"
                        style={{ width: `${todayTodoPercentage}%` }}
                    />
                    <div
                        className="progress-bar upcoming-to-do"
                        style={{ width: `${upcomingTodoPercentage}%` }}
                    />
                </div>
                <div className="task-count">
                    <span style={{ color: 'gray' }}>
                         Done: {completedEvents} <span className="dot" style={{ backgroundColor: 'green' }}></span>
                    </span>
                    <span style={{ color: 'gray' }}>
                         Today's To-Do: {todayTodo} <span className="dot" style={{ backgroundColor: 'blue' }}></span>
                    </span>
                    <span style={{ color: 'gray' }}>
                         Upcoming To-Do: {upcomingTodo} <span className="dot" style={{ backgroundColor: 'orange' }}></span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Progress;
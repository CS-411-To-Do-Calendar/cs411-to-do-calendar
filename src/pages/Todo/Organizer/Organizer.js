import React from 'react'
import Topic from '../../../componets/Topic/Topic'

// CSS
import './Organizer.css'

function Organizer() {
  const task = [
    {
      topic: "Today's Goal",
      subTopic: ["Wire Frame Finish", "Apply to internships"]
    },
    {
      topic: "Psychology",
      subTopic: ["Study PSY 101"]
    },
    {
      topic: "Software Engineering",
      subTopic: ["Study PSY 101", "Study PSY 101"]
    },
  ]

  // Array of task
  // Topic is going to take task[0], task[1], task[2], ....
  return (
    <div className='organizer-container'>
      <div className='organizer-header-container'>
        <div className='organizer-header-title'>To - Do List</div>
      </div>
      {
        task.map((key) => {
        return <Topic objCol={key} />
        })
      }
    </div>
  )
}

export default Organizer
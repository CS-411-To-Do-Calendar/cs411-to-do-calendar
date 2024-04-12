import React from 'react'
import './Progress.css' 

function Progress({done, todayTD, upcomingTD}) {
  return (
    <div>
        This is the progress bar
        You can call variable like:
        <div>done : {done}</div>
        <div>today To do: {todayTD}</div>
        <div>Upcoming to do: {upcomingTD}</div>
    </div>
  )
}

export default Progress
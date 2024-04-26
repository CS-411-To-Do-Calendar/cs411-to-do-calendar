import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../componets/spinner/spinner';
// Firebase!
import { UserAuth } from '../../context/AuthContext';

// API reading
import axios from 'axios';

// Calendar imports
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Ada from '../ADA/ADA'

// Icons
import { RxCalendar } from "react-icons/rx";
import { MdChecklistRtl } from "react-icons/md";
import { LuUsers, LuSettings } from "react-icons/lu";

// CSS
import './Account.css';
import Progress from './Progress/Progress';
import { getUserOauthToken } from '../../firestore/firebaseUser';
import { getDone, setDone} from '../../firestore/firebaseTask';

function Account() {
  const navigate = useNavigate();
  const [ accessToken, setAccessToken ] = useState();
  const localizer = momentLocalizer(moment);

  // It is importing AuthContext functions
  const { user, googleSignOut } = UserAuth();
  // Storin the calendar events
  const [ calendarEvents, setCalendarEvents ] = useState([]);
  // Store Priority to do  today events
  const [ todayTD, setTodayTD ] = useState([]);
  const [ tmrTD, setTmrTD ] = useState([]);
  const [ upcomingTD, setUpcomingTD ] = useState([]);

const [ totalUCTD, setTotalUCTD ] = useState(0);
const [ doneTD, setDoneTD ] = useState(0);


const fetchToken = async () => {
  setAccessToken(await getUserOauthToken(user.uid));
  setDoneTD(await getDone(user.uid));
};

const getComplete = async () => {
  setDoneTD(await getDone(user.uid));
};

useEffect(() => {
  if (user && user.uid) {
    fetchToken();
  }
}, [user]);

useEffect(() => {
  if (accessToken) {
    handleReadEvents();
  }
}, [accessToken]);

useEffect(() => {
  if (calendarEvents.length > 0) {
    setTotalUCTD(tmrTD.length + upcomingTD.length);
    getComplete();
  }
}, [calendarEvents]);

// Reads the Events
const handleReadEvents = async () => {

  // Make sure we have cred! if you refresh the page, you lose the cred. We will fix it by storing cred in firebase!
  if (!accessToken) {
    console.log('No access token found');
    return;
  }
  // accessToken = oauthAccessToken

  try {
    const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        timeMin: new Date().toISOString(),
        // Once you go more than 100, it will divide the events into arrays of 100 events each. 
        // (I could just add the arrays together by [..arr1, ...arr2, ...arr3], but I ma go sleep, it is 3:00AM ඞඞSUSඞඞ )
        maxResults: 100,
        singleEvents: true,
        orderBy: 'startTime'
      }
    });

    const events = response.data.items;
    // As long as there is at least 1 event in "events" variable,
    if (events.length) {
      // Filter the the event data in "events" so that we have only 'start', 'end', and 'title'
      const simplifiedEvents = events.map(event => ({
        //I've modified this to better handle all-day events. These events will instead be labeled as starting at 12am
        //This is because my all day events kept duplicating and causing issues :(
        //I also added the ID mapping for the remove function (differing between events with same title)
        start: event.start.dateTime ? moment(event.start.dateTime).toDate() : moment(event.start.date).toDate(),
        end: event.end.dateTime ? moment(event.end.dateTime).toDate() : moment(event.end.date).toDate(),
        title: event.summary,
        ID: event.id
      }));

      // Display the filtered events!
      // console.log('Simplified Events:', simplifiedEvents);
      // Set that filtered events to calendarEvent using Setter!
      setCalendarEvents(simplifiedEvents);
      //set the priority events based on the function filterPriorityEvents
      filterPriorityEvents(simplifiedEvents);
    } else {
      console.log('No upcoming events found.');
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }

};

const filterPriorityEvents = async (events) => {
  //get dates for purpose of sorting the events
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  try {
      for (let i = 0; i < events.length; i++) {
        if (moment(events[i].start).isSame(today, 'day')) {
          if (!todayTD.some((e) => e.title === events[i].title)) {
            setTodayTD(prev => [...prev, events[i]]);
          }
            
            //same for tomorrow
        } else if (moment(events[i].start).isSame(tomorrow, 'day')) {
          if (!tmrTD.some((e) => e.title === events[i].title)) {
            setTmrTD(prev => [...prev, events[i]]);
          }
            //same for upcoming. for this purpose, an upcoming event is one which happens
            //within 3 days of the current date, can change this :)
        } else if (moment(events[i].start) <= moment(today).add(3, 'days')) {
          if (!upcomingTD.some((e) => e.title === events[i].title)) {
            setUpcomingTD(prev => [...prev, events[i]]);
          }
        }
      }
  } catch (error) {
      console.log('bruh')
  }
};

//handleRemoveEvent is called by the JSX code when the user clicks a checkbox next to an event on Priority Todo
const handleRemoveEvent = async (index, event) => {
  try {
    setDoneTD(doneTD + 1);
    setDone(user.uid, doneTD);
    // Make sure we have cred
    if (!accessToken) {
      console.log('No access token found');
      return;
    }

    // Make the DELETE request to Google Calendar API
    await axios.delete(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${event.ID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Since we have removed events from the google calendar, we call handleReadEvents to get the updated
    //version of the calendar
    await handleReadEvents();
  } catch (error) {
    console.error('Error removing event:', error);
  }
};

// Handles Sign out on click. (This part is complete)
const handleSignOut = async () => {
  try {
    await googleSignOut();
  } catch (error) {
    console.error('Sign out error', error);
  }
};

return (
    <div className='account-page-container'>
      {/* Left hand side */}
      <div className='account-menu-container'>
        <div className='account-menu-user-greet-container'>
          <Spinner/>
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
            <div>Ava (Prof Donham ref)</div>
          </div>
          <div className='account-menu-control-child-container' onClick={() => navigate('/setting')}>
            <LuSettings className='account-menu-control-child-icon'/>
            <div>Setting</div>
          </div>
        </div>
      </div>

      {/* Calendar view */}
      <div className='account-calendar-container'>
        <div className='account-calendar-horizonal-line'/>
        <div className='account-calendar-component-container'>
          <div className='account-calendar-style'>
            <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                toolbar={true}
                defaultView={'month'}
                views={['month', 'week', 'day']}
            />
          </div>
          <div className='account-widget-container'>
            {/* <button onClick={handleReadEvents}>Read Events</button> */}
            {user?.displayName ? (
                <div onClick={handleSignOut}>Logout!</div>
            ) : (
                <a href='/'>Log In</a>
            )}
            {/* This code is for the priority to do list on the righthand side of the screen
            This works by having individual containers for each type of event: today, tomorrow, and upcoming.
            We put a checkbox next to each event in the case that we have removed it*/}
            <div className="priority-todo-container">
               <div id = 'priority-header'>Priority To-do</div>
              <div className = "today-container">
              <div>Today</div>
              <ul>
                {todayTD.map((event, index) => (
                    <li key={index}>
                      <input
                        type = "checkbox"
                        checked = {(calendarEvents.includes(event))}
                        onChange = {() => handleRemoveEvent(index, event)}
                        />
                      {moment(event.start).format('LT')} - {event.title}
                    </li>
                ))}
              </ul>
              </div>
              <div className = 'tomorrow-container'>
              <div>Tomorrow</div>
              <ul>
                {tmrTD.map((event, index) => (
                    <li key={index}>
                      <input
                          type = "checkbox"
                          checked = {(calendarEvents.includes(event))}
                          onChange = {() => handleRemoveEvent(index, event)}
                      />
                      {moment(event.start).format('LT')} - {event.title}
                    </li>
                ))}
              </ul>
              </div>
              <div className = 'upcoming-container'>
              <div>Upcoming</div>
              <ul>
                {upcomingTD.map((event, index) => (
                    <li key={index}>
                      <input
                          type = "checkbox"
                          checked = {(calendarEvents.includes(event))}
                          onChange = {() => handleRemoveEvent(index, event)}
                      />
                      {moment(event.start).format('LT')} - {event.title}
                    </li>
                ))}
              </ul>
              </div>
            </div>
            <Progress completedEvents={doneTD} todayTodo={todayTD.length} upcomingTodo={totalUCTD} />
            <Ada />
          </div>
        </div>
      </div>
    </div>
);
}

export default Account;

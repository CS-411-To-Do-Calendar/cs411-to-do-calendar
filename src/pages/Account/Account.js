import React, { useState } from 'react';

// Firebase!
import { UserAuth } from '../../context/AuthContext';

// API reading
import axios from 'axios';

// Calendar imports
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Img 
import img_google from '../../assets/google.png';

// Icons
import { RxCalendar } from "react-icons/rx";
import { MdChecklistRtl } from "react-icons/md";
import { LuUsers, LuSettings } from "react-icons/lu";

// CSS
import './Account.css';

function Account() {
  // It is importing AuthContext functions
  const {user, googleSignOut, credentials} = UserAuth();
  // Storin the calendar events
  const [calendarEvents, setCalendarEvents] = useState()
  // Store Priority to do  today events
  const [priorityTodoToday, setPriorityTodoToday] = useState([])
  // Store Priority to do  tomorrow events
  const [priorityTodoTomorrow, setPriorityTodoTomorrow] = useState([])
  // Store Priority to do  upcoming events
  const [priorityTodoUpcoming, setPriorityTodoUpcoming] = useState([])
  //store all priority events - this helps with remove functionality
  const [priorityTodo, setPriorityTodo] = useState([])
  // Time sync with where you are
  const localizer = momentLocalizer(moment);

  // Reads the Events
  const handleReadEvents = async () => {
    // Make sure we have cred! if you refresh the page, you lose the cred. We will fix it by storing cred in firebase!
    if (!credentials || !credentials._tokenResponse) {
      console.log('No access token found');
      return;
    }
    // accessToken = oauthAccessToken
    const accessToken = credentials._tokenResponse.oauthAccessToken;
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
        console.log('Simplified Events:', simplifiedEvents);
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

    //init arrays storing events by category
    //allEvents is useful in the remove function, less so for actually displaying the info
    const todayEvents = [];
    const tomorrowEvents = [];
    const upcomingEvents = [];
    const allEvents = []

    //filter each event based on when it occurs
    events.forEach((event) => {
    //add every event to allEvents
      allEvents.push(event);

      //check if start date is today, if it is and it also isn't already in the list, add it
      //had to check for duplicates. for some reason my events for today had a lot of duplicates
      if (moment(event.start).isSame(today, 'day')) {
        if (!todayEvents.some((e) => e.title === event.title)) {
          todayEvents.push(event);
        }

        //same for tomorrow
      } else if (moment(event.start).isSame(tomorrow, 'day')) {
        if (!tomorrowEvents.some((e) => e.title === event.title)) {
          tomorrowEvents.push(event);
          console.log(event)
        }

        //same for upcoming. for this purpose, an upcoming event is one which happens
        //within 3 days of the current date, can change this :)
      } else if (moment(event.start) <= moment(today).add(3, 'days')) {
        if (!upcomingEvents.some((e) => e.title === event.title)) {
          upcomingEvents.push(event);
        }
      }
    });
    //set the events
    setPriorityTodoToday(todayEvents);
    setPriorityTodoTomorrow(tomorrowEvents);
    setPriorityTodoUpcoming(upcomingEvents);
    setPriorityTodo(allEvents);
  };

  // Handles Sign out on click. (This part is complete)
  const handleSignOut = async () => {
    try {
      await googleSignOut();
    } catch (error) {
      console.error('Sign out error', error);
    }
  };

  //handleRemoveEvent is called by the JSX code when the user clicks a checkbox next to an event on Priority Todo
  const handleRemoveEvent = async (index, event) => {
    try {
      // Make sure we have cred
      if (!credentials || !credentials._tokenResponse) {
        console.log('No access token found');
        return;
      }

      // Get the access token
      const accessToken = credentials._tokenResponse.oauthAccessToken;

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

  return (
      <div className='account-page-container'>
        {/* Left hand side */}
        <div className='account-menu-container'>
          <div className='account-menu-user-greet-container'>
            <img src={img_google} alt='user-icon' className='account-menu-user-greet-icon'/>
            <div className='account-menu-user-greet-text'>Hello {user?.displayName},</div>
          </div>
          <div className='account-menu-control-container'>
            <div className='account-menu-control-child-container'>
              <RxCalendar className='account-menu-control-child-icon'/>
              <div>Calendar</div>
            </div>
            <div className='account-menu-control-child-container'>
              <MdChecklistRtl className='account-menu-control-child-icon'/>
              <div>To do List</div>
            </div>
            <div className='account-menu-control-child-container'>
              <LuUsers className='account-menu-control-child-icon'/>
              <div>Follows</div>
            </div>
            <div className='account-menu-control-child-container'>
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
              <button onClick={handleReadEvents}>Read Events</button>
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
                  {priorityTodoToday.map((event, index) => (
                      <li key={index}>
                        <input
                          type = "checkbox"
                          checked = {!(priorityTodo.includes(event))}
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
                  {priorityTodoTomorrow.map((event, index) => (
                      <li key={index}>
                        <input
                            type = "checkbox"
                            checked = {!(priorityTodo.includes(event))}
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
                  {priorityTodoUpcoming.map((event, index) => (
                      <li key={index}>
                        <input
                            type = "checkbox"
                            checked = {!(priorityTodo.includes(event))}
                            onChange = {() => handleRemoveEvent(index, event)}
                        />
                        {moment(event.start).format('LT')} - {event.title}
                      </li>
                  ))}
                </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Account;

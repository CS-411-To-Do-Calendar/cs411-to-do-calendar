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
  const { user, googleSignOut, credentials } = UserAuth();
  // Storin the calendar events
  const [calendarEvents, setCalendarEvents] = useState()
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
          start: moment(event.start.dateTime).toDate() || moment(event.start.date).toDate(), // dateTime for specific times, date for all-day events
          end: moment(event.end.dateTime).toDate() || moment(event.end.date).toDate(),
          title: event.summary
        }));

        // Display the filtered events!
        console.log('Simplified Events:', simplifiedEvents);
        // Set that filtered events to calendarEvent using Setter!
        setCalendarEvents(simplifiedEvents);
      } else {
        console.log('No upcoming events found.');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;

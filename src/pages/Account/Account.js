import React, { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import img_google from '../../assets/google.png';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { RxCalendar } from "react-icons/rx";
import { MdChecklistRtl } from "react-icons/md";
import { LuUsers, LuSettings } from "react-icons/lu";

import './Account.css';

function Account() {
  const localizer = momentLocalizer(moment);
  // It is importing AuthContext functions
  const { user, googleSignOut, credentials } = UserAuth();
  // Storin the calendar events
  const [calendarEvents, setCalendarEvents] = useState()
  
  const handleReadEvents = async () => {
      if (!credentials || !credentials._tokenResponse) {
          console.log('No access token found');
          return;
        }
      const accessToken = credentials._tokenResponse.oauthAccessToken;
    try {
      const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          timeMin: new Date().toISOString(),
          maxResults: 100,
          singleEvents: true,
          orderBy: 'startTime'
        }
      });
  
      const events = response.data.items;
      if (events.length) {
        const simplifiedEvents = events.map(event => ({
          start: moment(event.start.dateTime).toDate() || moment(event.start.date).toDate(), // dateTime for specific times, date for all-day events
          end: moment(event.end.dateTime).toDate() || moment(event.end.date).toDate(),
          title: event.summary
        }));

        console.log('Simplified Events:', simplifiedEvents);
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
              // events={myEventsList}
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

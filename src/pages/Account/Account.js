import React, { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import axios from 'axios';

function Account() {
  // It is importing AuthContext functions
  const { user, googleSignOut, credentials } = UserAuth();
  // Storin the calendar events
  const [calendarEvents, setCalendarEvents] = useState()
  const accessToken = credentials._tokenResponse.oauthAccessToken;

  const handleReadEvents = async () => {
    if (!credentials || !credentials._tokenResponse) {
      console.log('No access token found');
      return;
    }
    try {
      const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          timeMin: new Date().toISOString(),
          // maxResults: 40,
          singleEvents: true,
          orderBy: 'startTime'
        }
      });
  
      const events = response.data.items;
      if (events.length) {
        console.log('Events:', events);
        setCalendarEvents(events);
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
    <div>
      <div>Welcome to the to-do calendar {user?.displayName}!</div>
      {user?.displayName ? (
        <div onClick={handleSignOut}>Logout!</div>
      ) : (
        <a href='/'>Log In</a>
      )}
      <button onClick={handleReadEvents}>Read Events</button>
    </div>
  );
}

export default Account;

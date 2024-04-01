import React, { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';

function Account() {
  const { user, googleSignOut } = UserAuth();

  // useEffect(() => {
  //   const fetchCalendarData = async () => {
  //     if (user) {
  //       const idToken = await user.getIdToken(); // Get the user's id token
  //       const auth = new google.auth.OAuth2();
  //       auth.setCredentials({ access_token: idToken });

  //       const calendar = google.calendar({ version: 'v3', auth });
  //       const res = await calendar.events.list({
  //         calendarId: 'primary', // Fetch events from the user's primary calendar
  //         timeMin: (new Date()).toISOString(),
  //         maxResults: 10,
  //         singleEvents: true,
  //         orderBy: 'startTime',
  //       }); 
  //       setCalendarEvents(res.data.items); // Update state with the fetched events
  //     }
  //   };

  //   fetchCalendarData();
  // }, [user]);

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
    </div>
  );
}

export default Account;

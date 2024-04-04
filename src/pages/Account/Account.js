import React, { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
// Need this for google apis
// Here is the documentation!:   https://www.npmjs.com/package/googleapis
const {google} = require('googleapis');

// If you need google api key or Oauth 2.0 client IDs, click below:
    // https://console.cloud.google.com/apis/credentials?authuser=5&hl=en&project=bu-cs411-to-do-list


function Account() {
  // It is importing AuthContext functions
  const { user, googleSignOut, credentials } = UserAuth();
  // Storin the calendar events
  const [calendarEvents, setCalendarEvents] = useState({})

      // You can view the oauthAccessToken by typing:
      // console.log(credentials._tokenResponse.oauthAccessToken)

  // When "user" data changes, refresh to get the calendar data
  useEffect(() => {
    // Init the function
    const fetchCalendarData = async () => {
      // As long as user != null
      if (user) {
        // The user is signed in using firebase DB using google.
        // In order to call google api, you need user's google oauth access token. Line 25 sets the auth cred to google cred. Make sure when the user signs in, "credentials" is not null!
        const auth = new google.auth.OAuth2();
        auth.setCredentials({ access_token: credentials._tokenResponse.oauthAccessToken });

        // Google calendar api calling
            // Youtube video might help.
              // https://www.google.com/search?q=google+calendar+api+react+js+&sca_esv=6c300049f602ecc4&sxsrf=ACQVn091mMuKSehjYNyXtOCK5DXKtVv1dg%3A1712254302912&ei=Xu0OZtKUN6bY5NoP4PitmAM&ved=0ahUKEwjSu_WrlKmFAxUmLFkFHWB8CzMQ4dUDCBA&uact=5&oq=google+calendar+api+react+js+&gs_lp=Egxnd3Mtd2l6LXNlcnAiHWdvb2dsZSBjYWxlbmRhciBhcGkgcmVhY3QganMgMgUQABiABDIGEAAYFhgeMgsQABiABBiKBRiGAzILEAAYgAQYigUYhgMyCxAAGIAEGIoFGIYDMgsQABiABBiKBRiGAzILEAAYgAQYigUYhgNIwhBQswFYlRBwAXgAkAEAmAGcAaABvQiqAQM0Lja4AQPIAQD4AQGYAgqgAqIIwgIHECMYsAMYJ8ICChAAGEcY1gQYsAPCAg0QABiABBiKBRhDGLADwgIEECMYJ8ICChAjGIAEGIoFGCfCAgoQABiABBiKBRhDwgILEAAYgAQYigUYkQLCAggQABiABBjLAcICChAAGIAEGBQYhwKYAwCIBgGQBgqSBwMzLjegB89A&sclient=gws-wiz-serp#fpstate=ive&vld=cid:e7652700,vid:tgcCl52EN84,st:0
            // Stackoverflow that can help
              // https://stackoverflow.com/questions/74495585/add-google-calender-in-react-js
        const calendar = google.calendar({ version: 'v3', auth });
        try {
          const res = await calendar.events.list({
            calendarId: 'primary', // Fetch events from the user's primary calendar
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
          });
          setCalendarEvents(res.data.items); // Update state with the fetched events
        } catch (error) {
          console.error("error fetching calendar data: ", error);
        }
      }
    };
    // run the function 
    fetchCalendarData();
    // display calendar events
    console.log(calendarEvents)
  }, [user, credentials]);

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
          <>
        <div onClick={handleSignOut}>Logout!</div>
          <div>
            <h2>Calendar Events</h2>
            <ul>
              {calendarEvents.map((event, index) => (
                  <li key = {index}>{event.summary}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <a href='/'>Log In</a>
      )}
    </div>
  );
}

export default Account;

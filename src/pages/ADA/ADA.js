import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ADA.css';
import moment from 'moment'
import { UserAuth } from '../../context/AuthContext';
import { getUserOauthToken } from '../../firestore/firebaseUser';

function ADA() {
    // GPT (a.k.a ADA)

    //Status or the next step: Since you got GPT to read user input yes or no and execute it. Now you need to make it so that when the user ask "can you optimze the schedule, then it should suggest optimized schedule asking for yes or no to apply changes"
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);  // This will store both user and GPT-3 messages
    const [awaitingDecision, setAwaitingDecision] = useState(false);

    
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleUserDecision = async (decision) => {
        if (decision.toLowerCase() === 'yes') {
          // Logic to modify the calendar based on the recommendation
          // This could involve calling Google Calendar API to edit or add events
          console.log('Implement the change');
        } else {
          console.log('No changes made to the schedule.');
        }
      };
    
    const handleInput = async () => {
        if (inputValue.trim()) {
            const userMessage = { role: 'user', content: inputValue };
            setMessages(messages => [...messages, userMessage]); // Add user message to chat history
            
            if (awaitingDecision) {
                // Handle user decision on recommendation
                handleUserDecision(inputValue);
                setAwaitingDecision(false);  // Reset decision waiting status
                setInputValue("");  // Clear input field after sending
                return;
            }

            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: "gpt-3.5-turbo",
                    messages: [...messages, userMessage]  // Send the updated conversation history including the new message
                }, {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                const botMessage = {
                    role: 'assistant',
                    content: response.data.choices[0].message.content,
                };
                setMessages(messages => [...messages, botMessage]); // Add GPT-3 response to chat history

                if (botMessage.content.includes("Would you like me to apply these changes? Yes/No")) {
                    setAwaitingDecision(true);
                }
            } catch (error) {
                console.error('Error calling OpenAI:', error);
                setMessages(messages => [...messages, { role: 'assistant', content: 'Error fetching response' }]);
            }
            
            setInputValue(""); // Clear input field after sending
        }
    };

    // CALENDAR
    const [ accessToken, setAccessToken ] = useState();
  
    const { user } = UserAuth();

    const [ calendarEvents, setCalendarEvents ] = useState([]);
    
    const fetchToken = async () => {
        setAccessToken(await getUserOauthToken(user.uid));
    };
    
    useEffect(() => {
        if (user && user.uid) {
            fetchToken();
        }
    }, [user]);

    useEffect(() => {
        if (accessToken) {
            handleCalendarReadEvents();
        }
    }, [accessToken]);
    
    const handleCalendarReadEvents = async () => {
        
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
          } else {
            console.log('No upcoming events found.');
          }
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      
      };

    return (
        <div className="chat-container">
          <div className="message-container">
            {messages.map((message, index) => (
              <div key={index} className={message.role === 'user' ? 'user-message' : 'bot-message'}>
                {message.content}
              </div>
            ))}
          </div>
          <input
            className='chat-input'
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Enter your response here'
            onKeyDown={(e) => e.key === 'Enter' && handleInput()}
          />
        </div>
    );
}

export default ADA;

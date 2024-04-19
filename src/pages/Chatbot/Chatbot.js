import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

function Todo() {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);  // This will store both user and GPT-3 messages

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleInput = async () => {
        if (inputValue.trim()) {
            const userMessage = { role: 'user', content: inputValue };
            setMessages(messages => [...messages, userMessage]); // Add user message to chat history

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
            } catch (error) {
                console.error('Error calling OpenAI:', error);
                setMessages(messages => [...messages, { role: 'assistant', content: 'Error fetching response' }]);
            }

            setInputValue(""); // Clear input field after sending
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

export default Todo;

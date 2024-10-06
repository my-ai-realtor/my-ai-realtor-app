/* eslint-disable meteor/no-session */
/* eslint-disable no-console */
/* eslint-disable no-alert */

import React, { useState, useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

const ChatAssistantPage = () => {
  const [messages, setMessages] = useState(Session.get('chatMessages') || []); // Initialize messages from Session or empty array
  const [inputValue, setInputValue] = useState('');
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update Session whenever messages change
  useEffect(() => {
    Session.set('chatMessages', messages); // Store messages globally in Session
  }, [messages]);

  // Send the initial message when the chat is opened
  useEffect(() => {
    if (!initialMessageSent) {
      // Pass an empty string instead of an array or object
      Meteor.call('chatRealEstate', '', (error, reply) => {
        if (error) {
          console.error('Error:', error);
        } else {
          const assistantMessage = { sender: 'assistant', content: reply };
          setMessages(prevMessages => [...prevMessages, assistantMessage]);
          setInitialMessageSent(true);
        }
      });
    }
  }, [initialMessageSent]);

  const sendMessage = () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: 'user', content: trimmedInput };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');

    // Send only the trimmedInput to the chatRealEstate method
    Meteor.call('chatRealEstate', trimmedInput, (error, reply) => {
      if (error) {
        console.error('Error:', error);
      } else {
        const assistantMessage = { sender: 'assistant', content: reply };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
      }
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      {/* Chat header */}
      <div
        style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>Chat Assistant</div>
      </div>

      {/* Messages */}
      <div
        style={{
          flexGrow: 1,
          padding: '10px',
          overflowY: 'auto',
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.sender === 'user' ? 'right' : 'left',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: message.sender === 'user' ? '#007bff' : '#f1f0f0',
                color: message.sender === 'user' ? 'white' : 'black',
                maxWidth: '80%',
              }}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input field */}
      <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    </div>
  );
};

export default ChatAssistantPage;

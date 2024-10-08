/* eslint-disable meteor/no-session */

import React, { useState, useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

const ChatAssistantPage = () => {
  const [messages, setMessages] = useState(Session.get('chatMessages') || []);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to the latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update Session whenever messages change
  useEffect(() => {
    Session.set('chatMessages', messages);
  }, [messages]);

  // Send the initial message when the chat is first opened
  useEffect(() => {
    // Check if the initial message has been sent during this session
    if (!Session.get('initialMessageSent')) {
      // Send initial message
      Meteor.call('chatRealEstate', '', (error, reply) => {
        if (error) {
          console.error('Error:', error);
        } else {
          const assistantMessage = { sender: 'assistant', content: reply };
          setMessages(prevMessages => [...prevMessages, assistantMessage]);
          // Mark the initial message as sent in this session
          Session.set('initialMessageSent', true);
        }
      });
    }
  }, []);

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
    <div className="chat-assistant-page">
      {/* Messages */}
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            <div>{message.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input field */}
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default ChatAssistantPage;

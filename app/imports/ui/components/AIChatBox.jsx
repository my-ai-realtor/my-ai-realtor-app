/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable meteor/no-session */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState, useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// ChatBox component, with fullPage layout option
const ChatBox = ({ fullPage = false }) => {
  const [isOpen, setIsOpen] = useState(!fullPage); // Auto-open if fullPage
  const [messages, setMessages] = useState(Session.get('chatMessages') || []); // Initialize messages from Session or empty array
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo'); // Set your default model here
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

  // Send the initial message when the chat is opened (for floating chat only)
  useEffect(() => {
    if (isOpen && !initialMessageSent) {
      // Call the method with an empty message and selected model
      Meteor.call('chatRealEstate', '', selectedModel, (error, reply) => {
        if (error) {
          console.error('Error sending initial message:', error);
        } else {
          const assistantMessage = { sender: 'assistant', content: reply };
          setMessages(prevMessages => [...prevMessages, assistantMessage]);
          setInitialMessageSent(true);
        }
      });
    }
  }, [isOpen, initialMessageSent, selectedModel]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: 'user', content: trimmedInput };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');

    // Pass both the message and selected model when sending a message
    Meteor.call('chatRealEstate', trimmedInput, selectedModel, (error, reply) => {
      if (error) {
        console.error('Error sending message:', error);
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

  // Styles for floating vs fullPage chatbox
  const chatStyle = fullPage
    ? { width: '100%', backgroundColor: 'white', position: 'relative' }
    : {
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      width: '320px',
      height: '400px',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
    };

  return (
    <div>
      {/* Chat circle button - only for floating chat */}
      {!fullPage && (
        <button
          type="button"
          onClick={toggleChat}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: isOpen ? '#28a745' : '#007bff',
            color: 'white',
            border: 'none',
            fontSize: '30px',
            cursor: 'pointer',
          }}
        >
          {isOpen ? '✖' : '💬'}
        </button>
      )}

      {/* Chat window */}
      {(isOpen || fullPage) && (
        <div style={chatStyle}>
          {/* Chat header */}
          <div
            style={{
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              borderTopLeftRadius: fullPage ? '0' : '10px',
              borderTopRightRadius: fullPage ? '0' : '10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>Chat Assistant</div>
          </div>

          {/* Messages */}
          <div style={{ flexGrow: 1, padding: '10px', overflowY: 'auto' }}>
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
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

/* eslint-disable meteor/no-session */
import React, { useState, useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

const ChatAssitantPage = () => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Retrieve modelMap from settings
  const modelMap = Meteor.settings.public.modelMap || {};

  // Retrieve selected model and messages from Session, or set defaults
  const selectedModel = Session.get('selectedModel') || 'gpt-3.5-turbo';
  const [messages, setMessages] = useState(Session.get('chatMessages') || []);

  // Scroll to the latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send the initial message when the chat is first opened or model is changed
  useEffect(() => {
    if (!Session.get('initialMessageSent') && selectedModel) {
      Meteor.call('chatRealEstate', '', selectedModel, (error, reply) => {
        if (error) {
          console.error('Error sending initial message:', error);
        } else if (reply) {
          const assistantMessage = { sender: 'assistant', content: reply };
          const updatedMessages = [...messages, assistantMessage];
          setMessages(updatedMessages);
          Session.set('chatMessages', updatedMessages); // Store messages in Session
          Session.set('initialMessageSent', true);
        }
      });
    }
  }, [selectedModel]);

  const sendMessage = () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: 'user', content: trimmedInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    Session.set('chatMessages', updatedMessages); // Store messages in Session
    setInputValue('');

    Meteor.call('chatRealEstate', trimmedInput, selectedModel, (error, reply) => {
      if (error) {
        console.error('Error sending message:', error);
      } else if (reply) {
        const assistantMessage = { sender: 'assistant', content: reply };
        const newMessages = [...updatedMessages, assistantMessage];
        setMessages(newMessages);
        Session.set('chatMessages', newMessages); // Store updated messages in Session
      }
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    Session.set('selectedModel', newModel); // Store selected model in Session
    setMessages([]); // Clear the messages when switching model
    Session.set('chatMessages', []); // Clear messages from Session
    Session.set('initialMessageSent', false); // Reset session state to trigger initial message
  };

  return (
    <div className="chat-assistant-page">
      {/* Model Selection Dropdown */}
      <div className="model-selection">
        <select
          value={selectedModel}
          onChange={handleModelChange}
        >
          {Object.entries(modelMap).map(([, modelValue]) => (
            <option key={modelValue} value={modelValue}>
              {modelValue}
            </option>
          ))}
        </select>
      </div>

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

export default ChatAssitantPage;

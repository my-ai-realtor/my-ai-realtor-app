import React, { useState, useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';

const ChatModule = () => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    { sender: 'assistant', content: 'What are your interests?' },
  ]);

  // Scroll to the latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: 'user', content: trimmedInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');

    Meteor.call('chatRealEstate', trimmedInput, 'gpt-3.5-turbo', (error, reply) => {
      if (error) {
        console.error('Error sending message:', error);
      } else if (reply) {
        const assistantMessage = { sender: 'assistant', content: reply };
        const newMessages = [...updatedMessages, assistantMessage];
        setMessages(newMessages);
      }
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-assistant-sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px', borderLeft: '1px solid #ddd' }}>
      {/* Messages */}
      <div className="chat-messages" style={{ flex: 1, overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`} style={{ marginBottom: '10px' }}>
            <div>{message.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input field */}
      <div className="chat-input" style={{ marginTop: '10px' }}>
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
  );
};

export default ChatModule;

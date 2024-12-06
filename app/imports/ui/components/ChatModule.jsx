/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '600px',
    padding: '20px',
    marginTop: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fafafa',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    paddingBottom: '10px',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 0',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    marginRight: '10px',
  },
  message: {
    maxWidth: '70%',
    padding: '10px 15px',
    borderRadius: '20px',
    fontSize: '16px',
    lineHeight: '1.4',
    position: 'relative',
    animation: 'fadeIn 0.3s ease-in-out',
    wordWrap: 'break-word',
    minHeight: '20px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
  },
  inputField: {
    flex: 1,
    padding: '12px 15px',
    borderRadius: '25px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
  },
  sendButton: {
    marginLeft: '10px',
    padding: '12px 20px',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

// CSS Animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }`,
  styleSheet.cssRules.length,
);

const ChatModule = () => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { sender: 'assistant', content: 'What are your interests?' },
  ]);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [assistantTypingContent, setAssistantTypingContent] = useState('');

  // Scroll to the latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAssistantTyping]);

  const sendMessage = () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: 'user', content: trimmedInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');

    setIsAssistantTyping(true);
    setAssistantTypingContent('');

    Meteor.call('chatRealEstate', trimmedInput, 'gpt-3.5-turbo', (error, reply) => {
      if (error) {
        console.error('Error sending message:', error);
        setIsAssistantTyping(false);
      } else if (reply) {
        // Typing effect
        let index = 0;

        // Initialize assistantTypingContent with the first character
        setAssistantTypingContent(reply.charAt(0));
        index = 1;

        const typingInterval = setInterval(() => {
          if (index < reply.length) {
            setAssistantTypingContent((prev) => prev + reply.charAt(index));
            index++;
          } else {
            clearInterval(typingInterval);
            setIsAssistantTyping(false);
            const assistantMessage = { sender: 'assistant', content: reply };
            setMessages((prevMessages) => [...prevMessages, assistantMessage]);
            setAssistantTypingContent('');
          }
        }, 2); // Adjust typing speed here
      }
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={styles.chatContainer}>
      {/* Header */}
      <div style={styles.header}>
        <h2>MyAIRealtor</h2>
      </div>

      {/* Messages */}
      <div style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.messageContainer,
              flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
            }}
          >
            {message.sender === 'assistant' && (
              <img
                src="/images/robot.png"
                alt="Robot Avatar"
                style={styles.avatar}
              />
            )}
            <div
              style={{
                ...styles.message,
                backgroundColor: message.sender === 'user' ? '#007bff' : '#f1f0f0',
                color: message.sender === 'user' ? '#fff' : '#000',
              }}
            >
              {message.content}
            </div>
          </div>
        ))}
        {/* Assistant typing effect */}
        {isAssistantTyping && (
          <div style={{ ...styles.messageContainer, flexDirection: 'row' }}>
            <img
              src="/images/robot.png"
              alt="Robot Avatar"
              style={styles.avatar}
            />
            <div
              style={{
                ...styles.message,
                backgroundColor: '#f1f0f0',
                color: '#000',
              }}
            >
              {assistantTypingContent || '\u00A0'}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input field */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          style={styles.inputField}
        />
        <button type="button" onClick={sendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatModule;

import React, { useState } from 'react';
import './Chat.css';
import logo from './founderhood_logo.jpg'; // Import your logo image
import FileUpload from './FileUpload';
import axios from 'axios';

const Chat = () => {
  const [question, setQuestion] = useState(''); // User input
  const [messages, setMessages] = useState([]); // Chat history (user and bot messages)
  const [loading, setLoading] = useState(false); // Loading state for button

  // Handle input change for the question
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  // Handle send button click to submit the question
  const handleSend = async () => {
    if (!question.trim()) {
      alert("Please type something.");
      return;
    }

    setLoading(true);

    // Add user's question to the chat history
    setMessages((prevMessages) => [...prevMessages, { type: 'user', text: question }]);

    try {
      const response = await axios.post(
        'http://16.170.233.115:8000/api/answerontext/',
        { input: question },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: response.data.text }
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: "Failed to get response from the server." }
      ]);
    } finally {
      setLoading(false);
      setQuestion(''); // Clear input field after sending
    }
  };

  // Handle Enter key press to send message
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <a href="https://www.thefounderhood.com" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Founder Hood Logo" className="logo" />
        </a>
        <h1>Founder's Assistant-Hood</h1>
      </div>

      {/* Chat messages */}
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <strong>{message.type === 'user' ? 'You' : 'Bot'}:</strong> {message.text}
          </div>
        ))}
      </div>

      {/* Input section for file upload and chat */}
      <div className="chat-input">
        <FileUpload />

        {/* Text input for question */}
        <input
          type="text"
          placeholder="Type your message..."
          value={question}
          onChange={handleQuestionChange}
          onKeyPress={handleKeyPress}
        />
        
        {/* Send button */}
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
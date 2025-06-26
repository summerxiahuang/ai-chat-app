import React, {useState, useRef, useEffect} from "react";
import axios from "axios";

// API configuration
const API_BASE_URL = 'https://ai-chat-app-backend-777l.onrender.com';

function Chat() {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);

  const getErrorMessage = (error) => {
    if (error.response?.data?.details) {
      const details = error.response.data.details;
      if (details.includes('429') && details.includes('quota')) {
        return 'OpenAI API quota exceeded. Please check your billing or try again later.';
      } else if (details.includes('401')) {
        return 'Invalid API key. Please check your OpenAI API configuration.';
      } else if (details.includes('rate limit')) {
        return 'Rate limit exceeded. Please wait a moment and try again.';
      }
    }
    return 'Sorry, I encountered an error. Please try again.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading){
        const userMessage = { sender: 'user', text: message };
        setChat(prevChat => [...prevChat, userMessage]);
        setMessage('');
        setIsLoading(true);
        
        try {
            const response = await axios.post(`${API_BASE_URL}/api/chat`, {
                messages: [...chat, userMessage]
            });
            
            // Check if we're in demo mode
            if (response.data.note) {
                setChat(prevChat => [
                    ...prevChat, 
                    { sender: 'ai', text: response.data.reply },
                    { sender: 'system', text: response.data.note }
                ]);
            } else {
                setChat(prevChat => [...prevChat, { sender: 'ai', text: response.data.reply }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = getErrorMessage(error);
            setChat(prevChat => [...prevChat, { 
                sender: 'ai', 
                text: errorMessage 
            }]);
        } finally {
            setIsLoading(false);
        }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>💬 AI Chat Assistant</h1>
      </div>
      
      <div className="chat-window" ref={chatWindowRef}>
        {chat.length === 0 && (
          <div className="welcome-message">
            <p>👋 Hello! I'm your AI assistant. How can I help you today?</p>
            <p style={{ fontSize: '0.9rem', marginTop: '10px', opacity: 0.7 }}>
              💡 Make sure your OpenAI API key is configured and has available credits.
            </p>
          </div>
        )}
        
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        
        {isLoading && (
          <div className="message ai">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
      
      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? '⏳' : '📤'} Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat; 
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../store/slices/chatSlice';
import { sendTypingIndicator } from '../services/socketService';
import { FaPaperPlane, FaSmile } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import './MessageInput.css';

/**
 * Component for inputting and sending messages
 */
const MessageInput = ({ chatId, chatType }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatId]);
  
  // Handle typing indicator
  useEffect(() => {
    if (message && !isTyping) {
      setIsTyping(true);
      sendTypingIndicator(chatId, user.id, true);
    }
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        sendTypingIndicator(chatId, user.id, false);
      }
    }, 2000);
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [message, isTyping, chatId, user.id]);
  
  // Handle click outside emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current && 
        !emojiPickerRef.current.contains(event.target) &&
        event.target.id !== 'emoji-button'
      ) {
        setShowEmojiPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle message change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  
  // Handle emoji click
  const handleEmojiClick = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
    inputRef.current.focus();
  };
  
  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    
    // Create message object
    const newMessage = {
      roomId: chatType === 'room' ? chatId : null,
      senderId: user.id,
      receiverId: chatType === 'direct' ? chatId.split('-').find(id => id !== user.id) : null,
      sender: {
        id: user.id,
        username: user.username,
        avatar: user.avatar
      },
      content: trimmedMessage,
      timestamp: new Date().toISOString()
    };
    
    // Dispatch send message action
    dispatch(sendMessage(newMessage));
    
    // Clear input
    setMessage('');
    setIsTyping(false);
    sendTypingIndicator(chatId, user.id, false);
  };
  
  return (
    <div className="message-input-container">
      <form className="message-form" onSubmit={handleSendMessage}>
        <button 
          type="button" 
          className="emoji-button" 
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          id="emoji-button"
        >
          <FaSmile />
        </button>
        
        {showEmojiPicker && (
          <div className="emoji-picker-container" ref={emojiPickerRef}>
            <EmojiPicker 
              onEmojiClick={handleEmojiClick}
              width={300}
              height={400}
            />
          </div>
        )}
        
        <input
          ref={inputRef}
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={message}
          onChange={handleMessageChange}
        />
        
        <button 
          type="submit" 
          className="send-button"
          disabled={!message.trim()}
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

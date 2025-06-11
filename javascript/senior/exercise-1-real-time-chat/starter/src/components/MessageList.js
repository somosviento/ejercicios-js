import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import UserAvatar from './UserAvatar';
import { formatDistanceToNow } from 'date-fns';
import './MessageList.css';

/**
 * Component to display chat messages with virtualized list for performance
 */
const MessageList = ({ messages, currentUserId }) => {
  const listRef = useRef();
  const { typing } = useSelector(state => state.chat);
  const { byId: usersById } = useSelector(state => state.users);
  
  // Setup cell measurer cache for dynamic height measurement
  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 80
  }));
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (listRef.current && messages.length > 0) {
      // Wait for list to update before scrolling
      setTimeout(() => {
        listRef.current.scrollToRow(messages.length - 1);
      }, 50);
    }
  }, [messages.length]);
  
  // Reset cache when messages change
  useEffect(() => {
    cache.current.clearAll();
  }, [messages]);
  
  // Format timestamp
  const formatTimestamp = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'just now';
    }
  };
  
  // Render a message
  const renderMessage = ({ index, key, style, parent }) => {
    const message = messages[index];
    const isCurrentUser = message.senderId === currentUserId;
    
    return (
      <CellMeasurer
        key={key}
        cache={cache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div 
          style={style} 
          className={`message-container ${isCurrentUser ? 'own-message' : ''}`}
        >
          {!isCurrentUser && (
            <div className="message-avatar">
              <UserAvatar 
                src={message.sender.avatar} 
                alt={message.sender.username}
                size="sm"
              />
            </div>
          )}
          
          <div className={`message ${isCurrentUser ? 'own' : ''}`}>
            {!isCurrentUser && (
              <div className="message-sender">{message.sender.username}</div>
            )}
            
            <div className="message-content">{message.content}</div>
            
            <div className="message-meta">
              <span className="message-time">{formatTimestamp(message.timestamp)}</span>
              {isCurrentUser && (
                <span className={`message-status ${message.status}`}>
                  {message.status === 'sent' ? 'Sent' : 'Delivered'}
                </span>
              )}
            </div>
          </div>
        </div>
      </CellMeasurer>
    );
  };
  
  // Get users who are typing
  const getTypingUsers = () => {
    if (!typing || !Object.keys(typing).length) return [];
    
    const activeChat = useSelector(state => state.chat.activeChat);
    if (!activeChat) return [];
    
    const chatTyping = typing[activeChat.id];
    if (!chatTyping) return [];
    
    // Filter out current user and get user objects
    return Object.keys(chatTyping)
      .filter(userId => userId !== currentUserId)
      .map(userId => usersById[userId])
      .filter(Boolean);
  };
  
  const typingUsers = getTypingUsers();
  
  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-messages">
          <p>No messages yet</p>
          <small>Start the conversation!</small>
        </div>
      ) : (
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={listRef}
              width={width}
              height={height}
              deferredMeasurementCache={cache.current}
              rowHeight={cache.current.rowHeight}
              rowRenderer={renderMessage}
              rowCount={messages.length}
              overscanRowCount={5}
            />
          )}
        </AutoSizer>
      )}
      
      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="typing-text">
            {typingUsers.length === 1 
              ? `${typingUsers[0].username} is typing...` 
              : `${typingUsers.length} people are typing...`}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;

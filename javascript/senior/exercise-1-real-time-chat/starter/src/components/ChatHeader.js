import React from 'react';
import { FaUsers, FaEllipsisV } from 'react-icons/fa';
import UserAvatar from './UserAvatar';
import './ChatHeader.css';

/**
 * Header component for the chat area
 */
const ChatHeader = ({ chatData, chatType, onToggleUserList }) => {
  if (!chatData) return null;
  
  return (
    <div className="chat-header">
      <div className="chat-header-info">
        {chatType === 'room' ? (
          <>
            <div className="chat-header-icon">
              <span>#</span>
            </div>
            <div className="chat-header-details">
              <h2>{chatData.name}</h2>
              <p>{chatData.description}</p>
            </div>
          </>
        ) : (
          <>
            <UserAvatar 
              src={chatData.avatar} 
              alt={chatData.username}
              status={chatData.status}
              size="md"
            />
            <div className="chat-header-details">
              <h2>{chatData.username}</h2>
              <p className={`user-status ${chatData.status}`}>{chatData.status}</p>
            </div>
          </>
        )}
      </div>
      
      <div className="chat-header-actions">
        {chatType === 'room' && (
          <button 
            className="btn-icon" 
            onClick={onToggleUserList}
            title="Show Users"
          >
            <FaUsers />
          </button>
        )}
        <button className="btn-icon" title="More Options">
          <FaEllipsisV />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

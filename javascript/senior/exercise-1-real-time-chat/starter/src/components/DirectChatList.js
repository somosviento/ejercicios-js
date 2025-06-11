import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChat } from '../store/slices/chatSlice';
import UserAvatar from './UserAvatar';
import './DirectChatList.css';

/**
 * Component to display a list of direct chats
 */
const DirectChatList = ({ directChats, users, currentUserId }) => {
  const dispatch = useDispatch();
  const { activeChat } = useSelector(state => state.chat);
  
  // Handle direct chat click
  const handleChatClick = (chatId) => {
    dispatch(setActiveChat({
      id: chatId,
      type: 'direct'
    }));
  };
  
  // Get the other user in a direct chat
  const getOtherUser = (participants) => {
    const otherUserId = participants.find(id => id !== currentUserId);
    return users[otherUserId];
  };
  
  return (
    <div className="direct-chat-list">
      {directChats.length > 0 ? (
        directChats.map(chat => {
          const otherUser = getOtherUser(chat.participants);
          
          if (!otherUser) return null;
          
          return (
            <div 
              key={chat.id}
              className={`direct-chat-item ${activeChat?.id === chat.id && activeChat?.type === 'direct' ? 'active' : ''}`}
              onClick={() => handleChatClick(chat.id)}
            >
              <UserAvatar 
                src={otherUser.avatar} 
                alt={otherUser.username}
                status={otherUser.status}
                size="sm"
              />
              <div className="direct-chat-info">
                <h3 className="direct-chat-name">{otherUser.username}</h3>
                <p className="direct-chat-preview">
                  {/* TODO: Show last message preview */}
                  Click to start chatting
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="empty-list">
          <p>No direct messages yet</p>
          <small>Start a conversation from the users list</small>
        </div>
      )}
    </div>
  );
};

export default DirectChatList;

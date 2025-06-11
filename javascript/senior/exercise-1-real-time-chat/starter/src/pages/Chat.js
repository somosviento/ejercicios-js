import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, fetchMessages, setActiveChat } from '../store/slices/chatSlice';
import { fetchUsers } from '../store/slices/userSlice';
import './Chat.css';

// Components
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import UserList from '../components/UserList';

const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { rooms, activeChat, messages } = useSelector(state => state.chat);
  const { byId: usersById } = useSelector(state => state.users);
  
  const [showUserList, setShowUserList] = useState(false);
  
  // Fetch initial data
  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchUsers());
  }, [dispatch]);
  
  // Fetch messages when active chat changes
  useEffect(() => {
    if (activeChat && activeChat.type === 'room') {
      dispatch(fetchMessages(activeChat.id));
    }
  }, [activeChat, dispatch]);
  
  // Get current room or direct chat data
  const getCurrentChatData = () => {
    if (!activeChat) return null;
    
    if (activeChat.type === 'room') {
      return rooms.byId[activeChat.id];
    } else if (activeChat.type === 'direct') {
      // For direct chats, find the other user
      const [user1Id, user2Id] = activeChat.id.split('-');
      const otherUserId = user1Id === user.id ? user2Id : user1Id;
      return usersById[otherUserId];
    }
    
    return null;
  };
  
  // Get messages for current chat
  const getCurrentMessages = () => {
    if (!activeChat) return [];
    
    if (activeChat.type === 'room' && messages.byRoom[activeChat.id]) {
      return messages.byRoom[activeChat.id].map(id => messages.byId[id]);
    } else if (activeChat.type === 'direct' && messages.byDirectChat[activeChat.id]) {
      return messages.byDirectChat[activeChat.id].map(id => messages.byId[id]);
    }
    
    return [];
  };
  
  // Toggle user list sidebar
  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };
  
  const currentChatData = getCurrentChatData();
  const currentMessages = getCurrentMessages();
  
  return (
    <div className="chat-container">
      <Sidebar />
      
      <main className="chat-main">
        {currentChatData ? (
          <>
            <ChatHeader 
              chatData={currentChatData} 
              chatType={activeChat.type}
              onToggleUserList={toggleUserList}
            />
            
            <MessageList 
              messages={currentMessages}
              currentUserId={user.id}
            />
            
            <MessageInput 
              chatId={activeChat.id}
              chatType={activeChat.type}
            />
          </>
        ) : (
          <div className="chat-welcome">
            <h2>Welcome to ChatApp</h2>
            <p>Select a room or start a conversation</p>
          </div>
        )}
      </main>
      
      {showUserList && (
        <UserList onClose={toggleUserList} />
      )}
    </div>
  );
};

export default Chat;

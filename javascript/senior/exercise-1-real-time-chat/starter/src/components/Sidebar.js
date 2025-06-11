import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChat } from '../store/slices/chatSlice';
import { logout } from '../store/slices/authSlice';
import { FaPlus, FaSignOutAlt, FaUsers, FaComments } from 'react-icons/fa';
import './Sidebar.css';

// Components
import UserAvatar from './UserAvatar';
import RoomList from './RoomList';
import DirectChatList from './DirectChatList';
import CreateRoomModal from './CreateRoomModal';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { rooms, directChats } = useSelector(state => state.chat);
  const { online: onlineUsers, byId: usersById } = useSelector(state => state.users);
  
  const [activeTab, setActiveTab] = useState('rooms');
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  
  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
  };
  
  // Toggle create room modal
  const toggleCreateRoomModal = () => {
    setShowCreateRoomModal(!showCreateRoomModal);
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-user">
          <UserAvatar 
            src={user.avatar} 
            alt={user.username}
            status={user.status}
            size="md"
          />
          <div className="sidebar-user-info">
            <h3>{user.username}</h3>
            <span className={`user-status ${user.status}`}>
              {user.status}
            </span>
          </div>
        </div>
        <button 
          className="sidebar-logout" 
          onClick={handleLogout}
          title="Logout"
        >
          <FaSignOutAlt />
        </button>
      </div>
      
      <div className="sidebar-tabs">
        <button 
          className={`sidebar-tab ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          <FaUsers />
          <span>Rooms</span>
        </button>
        <button 
          className={`sidebar-tab ${activeTab === 'direct' ? 'active' : ''}`}
          onClick={() => setActiveTab('direct')}
        >
          <FaComments />
          <span>Direct</span>
        </button>
      </div>
      
      <div className="sidebar-content">
        {activeTab === 'rooms' ? (
          <>
            <div className="sidebar-content-header">
              <h2>Chat Rooms</h2>
              <button 
                className="btn-icon"
                onClick={toggleCreateRoomModal}
                title="Create Room"
              >
                <FaPlus />
              </button>
            </div>
            <RoomList rooms={Object.values(rooms.byId)} />
          </>
        ) : (
          <>
            <div className="sidebar-content-header">
              <h2>Direct Messages</h2>
            </div>
            <DirectChatList 
              directChats={Object.values(directChats.byId)} 
              users={usersById}
              currentUserId={user.id}
            />
          </>
        )}
      </div>
      
      {showCreateRoomModal && (
        <CreateRoomModal onClose={toggleCreateRoomModal} />
      )}
    </div>
  );
};

export default Sidebar;

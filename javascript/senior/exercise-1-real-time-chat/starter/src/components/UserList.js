import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChat } from '../store/slices/chatSlice';
import { FaTimes } from 'react-icons/fa';
import UserAvatar from './UserAvatar';
import './UserList.css';

/**
 * Component to display a list of users in a sidebar
 */
const UserList = ({ onClose }) => {
  const dispatch = useDispatch();
  const { byId: usersById, allIds: userIds } = useSelector(state => state.users);
  const { user: currentUser } = useSelector(state => state.auth);
  
  // Start a direct chat with a user
  const startDirectChat = (otherUserId) => {
    // Create a chat ID by combining the two user IDs in alphabetical order
    const chatId = [currentUser.id, otherUserId].sort().join('-');
    
    dispatch(setActiveChat({
      id: chatId,
      type: 'direct'
    }));
    
    onClose();
  };
  
  return (
    <div className="user-list-sidebar">
      <div className="user-list-header">
        <h2>Users</h2>
        <button className="btn-icon" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      
      <div className="user-list">
        {userIds
          .filter(id => id !== currentUser.id)
          .map(userId => {
            const user = usersById[userId];
            return (
              <div 
                key={user.id}
                className="user-item"
                onClick={() => startDirectChat(user.id)}
              >
                <UserAvatar 
                  src={user.avatar} 
                  alt={user.username}
                  status={user.status}
                  size="sm"
                />
                <div className="user-info">
                  <h3 className="user-name">{user.username}</h3>
                  <p className={`user-status ${user.status}`}>{user.status}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserList;

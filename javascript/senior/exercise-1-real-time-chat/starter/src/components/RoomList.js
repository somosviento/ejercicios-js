import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChat } from '../store/slices/chatSlice';
import './RoomList.css';

/**
 * Component to display a list of chat rooms
 */
const RoomList = ({ rooms }) => {
  const dispatch = useDispatch();
  const { activeChat } = useSelector(state => state.chat);
  
  // Handle room click
  const handleRoomClick = (roomId) => {
    dispatch(setActiveChat({
      id: roomId,
      type: 'room'
    }));
  };
  
  // Sort rooms by name
  const sortedRooms = [...rooms].sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <div className="room-list">
      {sortedRooms.length > 0 ? (
        sortedRooms.map(room => (
          <div 
            key={room.id}
            className={`room-item ${activeChat?.id === room.id && activeChat?.type === 'room' ? 'active' : ''}`}
            onClick={() => handleRoomClick(room.id)}
          >
            <div className="room-icon">#</div>
            <div className="room-info">
              <h3 className="room-name">{room.name}</h3>
              <p className="room-description">{room.description}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-list">
          <p>No rooms available</p>
        </div>
      )}
    </div>
  );
};

export default RoomList;

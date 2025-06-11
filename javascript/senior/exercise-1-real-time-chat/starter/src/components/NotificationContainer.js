import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../store/slices/notificationSlice';
import './NotificationContainer.css';
import { FaTimes, FaEnvelope, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

/**
 * Container for displaying toast notifications
 */
const NotificationContainer = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.notifications);
  
  // Filter only toast notifications
  const toastNotifications = notifications.filter(notification => notification.type === 'toast');
  
  // Handle close notification
  const handleClose = (id) => {
    dispatch(removeNotification(id));
  };
  
  // Get icon based on notification type
  const getNotificationIcon = (notification) => {
    switch (notification.type) {
      case 'message':
        return <FaEnvelope />;
      case 'status':
        return <FaInfoCircle />;
      case 'error':
        return <FaExclamationTriangle />;
      default:
        return <FaInfoCircle />;
    }
  };
  
  if (toastNotifications.length === 0) {
    return null;
  }
  
  return (
    <div className="notification-container">
      {toastNotifications.map(notification => (
        <div 
          key={notification.id} 
          className={`notification ${notification.type}`}
        >
          <div className="notification-icon">
            {getNotificationIcon(notification)}
          </div>
          <div className="notification-content">
            <h4 className="notification-title">{notification.title}</h4>
            <p className="notification-message">{notification.message}</p>
          </div>
          <button 
            className="notification-close" 
            onClick={() => handleClose(notification.id)}
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;

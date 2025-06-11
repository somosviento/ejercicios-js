import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  notifications: [],
  unreadCount: 0
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: uuidv4(),
        read: false,
        timestamp: new Date().toISOString(),
        ...action.payload
      };
      
      state.notifications.unshift(notification);
      state.unreadCount += 1;
    },
    markNotificationAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(n => n.id === notificationId);
      
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      const notificationIndex = state.notifications.findIndex(n => n.id === notificationId);
      
      if (notificationIndex !== -1) {
        const wasUnread = !state.notifications[notificationIndex].read;
        state.notifications.splice(notificationIndex, 1);
        
        if (wasUnread) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    }
  }
});

export const {
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearAllNotifications
} = notificationSlice.actions;

export default notificationSlice.reducer;

// Helper function to create notifications
export const createNotification = ({ type, title, message, sender, roomId }) => ({
  type,
  title,
  message,
  sender,
  roomId
});

// Thunk action creators
export const showNotification = (notificationData) => (dispatch) => {
  const notification = createNotification(notificationData);
  dispatch(addNotification(notification));
  
  // Auto-remove notification after 5 seconds if it's a toast type
  if (notification.type === 'toast') {
    setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, 5000);
  }
  
  return notification;
};

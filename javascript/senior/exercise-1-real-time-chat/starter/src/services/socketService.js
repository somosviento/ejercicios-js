import { io } from 'socket.io-client';
import { addMessage, updateMessageStatus, setUserTyping } from '../store/slices/chatSlice';
import { updateUserStatus } from '../store/slices/userSlice';
import { showNotification } from '../store/slices/notificationSlice';

let socket;

// TODO: Replace with actual WebSocket server URL
const SOCKET_URL = 'http://localhost:5000';

/**
 * Initialize socket connection
 * @param {string} userId - Current user ID
 * @param {function} dispatch - Redux dispatch function
 */
export const initializeSocket = (userId, dispatch) => {
  // Close existing connection if any
  if (socket) {
    socket.close();
  }

  // TODO: Implement actual WebSocket connection
  // For now, we'll mock the socket connection and events
  
  console.log(`[Socket] Initializing socket for user ${userId}`);
  
  // Mock socket events
  const mockSocketEvents = () => {
    console.log('[Socket] Mock socket initialized');
    
    // Mock receiving a message
    setTimeout(() => {
      const mockMessage = {
        id: 'mock-msg-1',
        roomId: 'general',
        senderId: 'user2',
        sender: {
          id: 'user2',
          username: 'Bob',
          avatar: 'https://ui-avatars.com/api/?name=Bob&background=random'
        },
        content: 'Hello! This is a mock message from the socket.',
        timestamp: new Date().toISOString(),
        status: 'delivered'
      };
      
      dispatch(addMessage(mockMessage));
      
      // Show notification for the message
      dispatch(showNotification({
        type: 'message',
        title: 'New Message',
        message: `${mockMessage.sender.username}: ${mockMessage.content}`,
        sender: mockMessage.sender,
        roomId: mockMessage.roomId
      }));
    }, 3000);
    
    // Mock user status change
    setTimeout(() => {
      dispatch(updateUserStatus({
        userId: 'user3',
        status: 'online'
      }));
      
      dispatch(showNotification({
        type: 'status',
        title: 'User Online',
        message: 'Charlie is now online',
        sender: {
          id: 'user3',
          username: 'Charlie'
        }
      }));
    }, 5000);
    
    // Mock typing indicator
    setTimeout(() => {
      dispatch(setUserTyping({
        chatId: 'general',
        userId: 'user2',
        isTyping: true
      }));
      
      // Stop typing after 3 seconds
      setTimeout(() => {
        dispatch(setUserTyping({
          chatId: 'general',
          userId: 'user2',
          isTyping: false
        }));
      }, 3000);
    }, 8000);
  };
  
  // Start mock socket events
  mockSocketEvents();
  
  return {
    // Mock socket methods
    emit: (event, data) => {
      console.log(`[Socket] Emitting ${event}:`, data);
      
      // Mock message sent acknowledgement
      if (event === 'send_message') {
        setTimeout(() => {
          dispatch(updateMessageStatus({
            messageId: data.id,
            status: 'delivered'
          }));
        }, 500);
      }
      
      // Mock typing indicator
      if (event === 'typing') {
        // No action needed for mock
      }
    },
    disconnect: () => {
      console.log('[Socket] Disconnected');
    }
  };
};

/**
 * Send a message through the socket
 * @param {object} message - Message object to send
 */
export const sendMessage = (message) => {
  if (socket) {
    socket.emit('send_message', message);
  }
};

/**
 * Send typing indicator through the socket
 * @param {string} chatId - ID of the chat (room or direct)
 * @param {string} userId - ID of the user who is typing
 * @param {boolean} isTyping - Whether the user is typing or stopped typing
 */
export const sendTypingIndicator = (chatId, userId, isTyping) => {
  if (socket) {
    socket.emit('typing', { chatId, userId, isTyping });
  }
};

/**
 * Join a chat room
 * @param {string} roomId - ID of the room to join
 * @param {string} userId - ID of the user joining
 */
export const joinRoom = (roomId, userId) => {
  if (socket) {
    socket.emit('join_room', { roomId, userId });
  }
};

/**
 * Leave a chat room
 * @param {string} roomId - ID of the room to leave
 * @param {string} userId - ID of the user leaving
 */
export const leaveRoom = (roomId, userId) => {
  if (socket) {
    socket.emit('leave_room', { roomId, userId });
  }
};

/**
 * Update user status
 * @param {string} userId - ID of the user
 * @param {string} status - New status ('online', 'away', 'offline')
 */
export const updateStatus = (userId, status) => {
  if (socket) {
    socket.emit('status_change', { userId, status });
  }
};

/**
 * Disconnect socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

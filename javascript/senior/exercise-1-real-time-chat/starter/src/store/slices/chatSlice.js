import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  rooms: {
    byId: {
      'general': {
        id: 'general',
        name: 'General',
        description: 'General chat room for everyone',
        type: 'public',
        createdAt: new Date().toISOString()
      },
      'random': {
        id: 'random',
        name: 'Random',
        description: 'Random discussions and off-topic chat',
        type: 'public',
        createdAt: new Date().toISOString()
      },
      'tech': {
        id: 'tech',
        name: 'Tech',
        description: 'Technology discussions',
        type: 'public',
        createdAt: new Date().toISOString()
      }
    },
    allIds: ['general', 'random', 'tech']
  },
  messages: {
    byId: {},
    allIds: [],
    byRoom: {
      'general': [],
      'random': [],
      'tech': []
    },
    byDirectChat: {}
  },
  directChats: {
    byId: {},
    allIds: []
  },
  activeChat: {
    id: 'general',
    type: 'room'
  },
  typing: {},
  loading: false,
  error: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Room actions
    fetchRoomsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRoomsSuccess: (state, action) => {
      const rooms = action.payload;
      
      // TODO: Normalize rooms data
      // This is a placeholder implementation
      state.rooms.byId = rooms.reduce((acc, room) => {
        acc[room.id] = room;
        return acc;
      }, {});
      
      state.rooms.allIds = rooms.map(room => room.id);
      state.loading = false;
    },
    fetchRoomsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Message actions
    fetchMessagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMessagesSuccess: (state, action) => {
      const { roomId, messages } = action.payload;
      
      // TODO: Normalize messages data and update state
      // This is a placeholder implementation
      const messagesById = {};
      const messageIds = [];
      
      messages.forEach(message => {
        messagesById[message.id] = message;
        messageIds.push(message.id);
      });
      
      // Update messages in state
      state.messages.byId = { ...state.messages.byId, ...messagesById };
      state.messages.allIds = [...new Set([...state.messages.allIds, ...messageIds])];
      state.messages.byRoom[roomId] = messageIds;
      
      state.loading = false;
    },
    fetchMessagesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Add a new message
    addMessage: (state, action) => {
      const message = action.payload;
      const { id, roomId, senderId, receiverId } = message;
      
      // Add message to byId
      state.messages.byId[id] = message;
      
      // Add message to allIds
      if (!state.messages.allIds.includes(id)) {
        state.messages.allIds.push(id);
      }
      
      // Add message to appropriate container (room or direct chat)
      if (roomId) {
        if (!state.messages.byRoom[roomId]) {
          state.messages.byRoom[roomId] = [];
        }
        state.messages.byRoom[roomId].push(id);
      } else if (senderId && receiverId) {
        const chatId = [senderId, receiverId].sort().join('-');
        
        if (!state.messages.byDirectChat[chatId]) {
          state.messages.byDirectChat[chatId] = [];
        }
        state.messages.byDirectChat[chatId].push(id);
        
        // Ensure direct chat exists
        if (!state.directChats.byId[chatId]) {
          state.directChats.byId[chatId] = {
            id: chatId,
            participants: [senderId, receiverId],
            createdAt: new Date().toISOString()
          };
          
          if (!state.directChats.allIds.includes(chatId)) {
            state.directChats.allIds.push(chatId);
          }
        }
      }
    },
    
    // Update message status
    updateMessageStatus: (state, action) => {
      const { messageId, status } = action.payload;
      
      if (state.messages.byId[messageId]) {
        state.messages.byId[messageId].status = status;
      }
    },
    
    // Set active chat
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    
    // Typing indicators
    setUserTyping: (state, action) => {
      const { chatId, userId, isTyping } = action.payload;
      
      if (!state.typing[chatId]) {
        state.typing[chatId] = {};
      }
      
      if (isTyping) {
        state.typing[chatId][userId] = Date.now();
      } else {
        delete state.typing[chatId][userId];
      }
    },
    
    // Create a new room
    createRoom: (state, action) => {
      const room = action.payload;
      
      state.rooms.byId[room.id] = room;
      state.rooms.allIds.push(room.id);
      state.messages.byRoom[room.id] = [];
    }
  }
});

export const {
  fetchRoomsStart,
  fetchRoomsSuccess,
  fetchRoomsFailure,
  fetchMessagesStart,
  fetchMessagesSuccess,
  fetchMessagesFailure,
  addMessage,
  updateMessageStatus,
  setActiveChat,
  setUserTyping,
  createRoom
} = chatSlice.actions;

export default chatSlice.reducer;

// Thunk action creators
export const fetchRooms = () => async (dispatch) => {
  try {
    dispatch(fetchRoomsStart());
    
    // TODO: Implement actual API call to fetch rooms
    // For now, use the default rooms in the initial state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const rooms = [
      {
        id: 'general',
        name: 'General',
        description: 'General chat room for everyone',
        type: 'public',
        createdAt: new Date().toISOString()
      },
      {
        id: 'random',
        name: 'Random',
        description: 'Random discussions and off-topic chat',
        type: 'public',
        createdAt: new Date().toISOString()
      },
      {
        id: 'tech',
        name: 'Tech',
        description: 'Technology discussions',
        type: 'public',
        createdAt: new Date().toISOString()
      }
    ];
    
    dispatch(fetchRoomsSuccess(rooms));
  } catch (error) {
    dispatch(fetchRoomsFailure(error.message));
  }
};

export const fetchMessages = (roomId) => async (dispatch) => {
  try {
    dispatch(fetchMessagesStart());
    
    // TODO: Implement actual API call to fetch messages
    // For now, generate some mock messages
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate mock messages
    const mockUsers = [
      { id: 'system', username: 'System', avatar: 'https://ui-avatars.com/api/?name=System&background=random' },
      { id: 'user1', username: 'Alice', avatar: 'https://ui-avatars.com/api/?name=Alice&background=random' },
      { id: 'user2', username: 'Bob', avatar: 'https://ui-avatars.com/api/?name=Bob&background=random' }
    ];
    
    const mockMessages = Array(10).fill().map((_, i) => {
      const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      return {
        id: uuidv4(),
        roomId,
        senderId: user.id,
        sender: {
          id: user.id,
          username: user.username,
          avatar: user.avatar
        },
        content: `This is a sample message ${i + 1} in the ${roomId} room.`,
        timestamp: new Date(Date.now() - (i * 60000)).toISOString(),
        status: 'delivered'
      };
    });
    
    dispatch(fetchMessagesSuccess({ roomId, messages: mockMessages }));
  } catch (error) {
    dispatch(fetchMessagesFailure(error.message));
  }
};

export const sendMessage = (message) => async (dispatch) => {
  try {
    // Create a new message with a unique ID
    const newMessage = {
      ...message,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    // Add message to local state immediately for optimistic UI update
    dispatch(addMessage(newMessage));
    
    // TODO: Send message via socket or API
    // For now, simulate a network delay and update status
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update message status to delivered
    dispatch(updateMessageStatus({ messageId: newMessage.id, status: 'delivered' }));
    
    return newMessage;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
};

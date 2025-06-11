import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byId: {},
  allIds: [],
  online: [],
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      const users = action.payload;
      
      // Normalize users data
      const usersById = {};
      const userIds = [];
      const onlineUsers = [];
      
      users.forEach(user => {
        usersById[user.id] = user;
        userIds.push(user.id);
        
        if (user.status === 'online') {
          onlineUsers.push(user.id);
        }
      });
      
      state.byId = usersById;
      state.allIds = userIds;
      state.online = onlineUsers;
      state.loading = false;
      state.error = null;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload;
      
      if (state.byId[userId]) {
        state.byId[userId].status = status;
        
        // Update online users list
        if (status === 'online' && !state.online.includes(userId)) {
          state.online.push(userId);
        } else if (status !== 'online') {
          state.online = state.online.filter(id => id !== userId);
        }
      }
    },
    addUser: (state, action) => {
      const user = action.payload;
      
      state.byId[user.id] = user;
      
      if (!state.allIds.includes(user.id)) {
        state.allIds.push(user.id);
      }
      
      if (user.status === 'online' && !state.online.includes(user.id)) {
        state.online.push(user.id);
      }
    }
  }
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserStatus,
  addUser
} = userSlice.actions;

export default userSlice.reducer;

// Thunk action creators
export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());
    
    // TODO: Implement actual API call to fetch users
    // For now, generate mock users
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUsers = [
      { 
        id: 'user1', 
        username: 'Alice', 
        avatar: 'https://ui-avatars.com/api/?name=Alice&background=random',
        status: 'online',
        lastActive: new Date().toISOString()
      },
      { 
        id: 'user2', 
        username: 'Bob', 
        avatar: 'https://ui-avatars.com/api/?name=Bob&background=random',
        status: 'online',
        lastActive: new Date().toISOString()
      },
      { 
        id: 'user3', 
        username: 'Charlie', 
        avatar: 'https://ui-avatars.com/api/?name=Charlie&background=random',
        status: 'offline',
        lastActive: new Date(Date.now() - 3600000).toISOString()
      },
      { 
        id: 'user4', 
        username: 'Diana', 
        avatar: 'https://ui-avatars.com/api/?name=Diana&background=random',
        status: 'away',
        lastActive: new Date(Date.now() - 600000).toISOString()
      },
      { 
        id: 'user5', 
        username: 'Evan', 
        avatar: 'https://ui-avatars.com/api/?name=Evan&background=random',
        status: 'online',
        lastActive: new Date().toISOString()
      }
    ];
    
    dispatch(fetchUsersSuccess(mockUsers));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};

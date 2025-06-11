import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { mockApiCall } from '../../utils/mockApi';

// Sample initial data
const initialUsers = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user-1',
    role: 'admin',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user-2',
    role: 'member',
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user-3',
    role: 'member',
  },
];

// Create entity adapter
const usersAdapter = createEntityAdapter();

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      const users = await mockApiCall(() => initialUsers, 800);
      return users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    ...usersAdapter.getInitialState(),
    currentUser: 'user-1', // Default to first user for demo purposes
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch users';
      });
  },
});

// Export actions
export const { setCurrentUser } = userSlice.actions;

// Export selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.users);

export const selectCurrentUser = (state) => {
  const currentUserId = state.users.currentUser;
  return selectUserById(state, currentUserId);
};

// Export reducer
export default userSlice.reducer;

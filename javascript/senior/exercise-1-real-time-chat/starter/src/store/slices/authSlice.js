import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUserStatus: (state, action) => {
      if (state.user) {
        state.user.status = action.payload;
      }
    }
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  registerStart, 
  registerSuccess, 
  registerFailure, 
  logout,
  updateUserStatus
} = authSlice.actions;

export default authSlice.reducer;

// Thunk action creators
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    // TODO: Implement actual API call to login
    // For now, simulate API call with setTimeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login response
    const user = {
      id: '1',
      username: credentials.username,
      email: credentials.email || `${credentials.username}@example.com`,
      avatar: `https://ui-avatars.com/api/?name=${credentials.username}&background=random`,
      status: 'online'
    };
    
    dispatch(loginSuccess(user));
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    
    // TODO: Implement actual API call to register
    // For now, simulate API call with setTimeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful registration response
    const user = {
      id: '1',
      username: userData.username,
      email: userData.email,
      avatar: `https://ui-avatars.com/api/?name=${userData.username}&background=random`,
      status: 'online'
    };
    
    dispatch(registerSuccess(user));
    return { success: true };
  } catch (error) {
    dispatch(registerFailure(error.message));
    return { success: false, error: error.message };
  }
};

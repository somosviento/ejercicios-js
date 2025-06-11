import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import boardsReducer from './slices/boardSlice';
import usersReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['boards', 'users'], // Only persist these reducers
};

// Combine all reducers
const rootReducer = combineReducers({
  boards: boardsReducer,
  users: usersReducer,
  ui: uiReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export * from './slices/boardSlice';
export * from './slices/userSlice';
export * from './slices/uiSlice';

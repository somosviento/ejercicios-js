import { createSlice } from '@reduxjs/toolkit';

// Get initial dark mode preference from localStorage or system preference
const getInitialDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode !== null) {
    return savedMode === 'true';
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState = {
  sidebarOpen: true,
  darkMode: getInitialDarkMode(),
  notifications: [],
  currentModal: null,
  modalData: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', state.darkMode);
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
        read: false,
        timestamp: new Date().toISOString(),
      });
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    openModal: (state, action) => {
      state.currentModal = action.payload.modalType;
      state.modalData = action.payload.modalData || null;
    },
    closeModal: (state) => {
      state.currentModal = null;
      state.modalData = null;
    },
  },
});

// Export actions
export const {
  toggleSidebar,
  setSidebarOpen,
  toggleDarkMode,
  setDarkMode,
  addNotification,
  markNotificationAsRead,
  clearNotifications,
  openModal,
  closeModal,
} = uiSlice.actions;

// Export selectors
export const selectDarkMode = (state) => state.ui.darkMode;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectNotifications = (state) => state.ui.notifications;
export const selectUnreadNotificationsCount = (state) => 
  state.ui.notifications.filter(n => !n.read).length;
export const selectCurrentModal = (state) => state.ui.currentModal;
export const selectModalData = (state) => state.ui.modalData;

export default uiSlice.reducer;

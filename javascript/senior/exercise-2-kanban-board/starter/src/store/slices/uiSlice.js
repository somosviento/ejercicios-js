import { createSlice } from '@reduxjs/toolkit';

// Create the slice
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    modals: {
      createBoard: false,
      editBoard: false,
      createColumn: false,
      editColumn: false,
      createTask: false,
      editTask: false,
      deleteConfirmation: false,
    },
    modalData: null,
    filters: {
      priority: null, // null | 'low' | 'medium' | 'high'
      assignee: null, // null | userId
      dueDate: null, // null | 'overdue' | 'today' | 'week' | 'month'
      searchTerm: '',
    },
    sortBy: 'createdAt', // 'createdAt' | 'dueDate' | 'priority'
    sortDirection: 'asc', // 'asc' | 'desc'
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action) => {
      const { modalType, data } = action.payload;
      state.modals[modalType] = true;
      state.modalData = data;
    },
    closeModal: (state, action) => {
      const modalType = action.payload;
      state.modals[modalType] = false;
      if (Object.values(state.modals).every(isOpen => !isOpen)) {
        state.modalData = null;
      }
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modal => {
        state.modals[modal] = false;
      });
      state.modalData = null;
    },
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
    },
    clearFilters: (state) => {
      state.filters = {
        priority: null,
        assignee: null,
        dueDate: null,
        searchTerm: '',
      };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleSortDirection: (state) => {
      state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    },
  },
});

// Export actions
export const {
  toggleSidebar,
  openModal,
  closeModal,
  closeAllModals,
  setFilter,
  clearFilters,
  setSortBy,
  toggleSortDirection,
} = uiSlice.actions;

// Export selectors
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectModals = (state) => state.ui.modals;
export const selectModalData = (state) => state.ui.modalData;
export const selectFilters = (state) => state.ui.filters;
export const selectSortOptions = (state) => ({
  sortBy: state.ui.sortBy,
  sortDirection: state.ui.sortDirection,
});

// Export reducer
export default uiSlice.reducer;

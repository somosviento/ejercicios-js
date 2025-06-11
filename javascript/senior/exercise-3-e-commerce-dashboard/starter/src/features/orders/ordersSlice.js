import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchOrders, 
  fetchOrderById, 
  updateOrderStatus 
} from '../../utils/mockApi';

// Async thunks
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await fetchOrders(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchOrderById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeOrderStatus = createAsyncThunk(
  'orders/changeOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatus(id, status);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  filters: {
    status: '',
    search: '',
    customer_id: '',
    sort: 'created_at:desc',
  },
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrdersError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
      state.page = 1; // Reset to first page when filters change
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.page = 1; // Reset to first page when limit changes
    },
    clearOrderDetail: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get orders cases
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get order by ID cases
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Change order status cases
      .addCase(changeOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        
        // Update in orders list
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        
        // Update current order if it's the same
        if (state.order && state.order.id === action.payload.id) {
          state.order = action.payload;
        }
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  clearOrdersError,
  setFilters,
  setPage,
  setLimit,
  clearOrderDetail,
} = ordersSlice.actions;

// Export selectors
export const selectOrders = (state) => state.orders.orders;
export const selectOrder = (state) => state.orders.order;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;
export const selectOrdersTotal = (state) => state.orders.total;
export const selectOrdersPage = (state) => state.orders.page;
export const selectOrdersLimit = (state) => state.orders.limit;
export const selectOrdersTotalPages = (state) => state.orders.totalPages;
export const selectOrdersFilters = (state) => state.orders.filters;

export default ordersSlice.reducer;

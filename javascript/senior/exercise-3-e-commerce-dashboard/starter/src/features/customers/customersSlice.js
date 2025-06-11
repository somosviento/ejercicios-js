import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchCustomers, 
  fetchCustomerById, 
  fetchCustomerOrders 
} from '../../utils/mockApi';

// Async thunks
export const getCustomers = createAsyncThunk(
  'customers/getCustomers',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await fetchCustomers(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCustomerById = createAsyncThunk(
  'customers/getCustomerById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchCustomerById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCustomerOrders = createAsyncThunk(
  'customers/getCustomerOrders',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await fetchCustomerOrders(customerId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  customers: [],
  customer: null,
  customerOrders: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  filters: {
    search: '',
    sort: 'createdAt:desc',
  },
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearCustomersError: (state) => {
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
    clearCustomerDetail: (state) => {
      state.customer = null;
      state.customerOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get customers cases
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.customers;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get customer by ID cases
      .addCase(getCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(getCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get customer orders cases
      .addCase(getCustomerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.customerOrders = action.payload;
      })
      .addCase(getCustomerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  clearCustomersError,
  setFilters,
  setPage,
  setLimit,
  clearCustomerDetail,
} = customersSlice.actions;

// Export selectors
export const selectCustomers = (state) => state.customers.customers;
export const selectCustomer = (state) => state.customers.customer;
export const selectCustomerOrders = (state) => state.customers.customerOrders;
export const selectCustomersLoading = (state) => state.customers.loading;
export const selectCustomersError = (state) => state.customers.error;
export const selectCustomersTotal = (state) => state.customers.total;
export const selectCustomersPage = (state) => state.customers.page;
export const selectCustomersLimit = (state) => state.customers.limit;
export const selectCustomersTotalPages = (state) => state.customers.totalPages;
export const selectCustomersFilters = (state) => state.customers.filters;

export default customersSlice.reducer;

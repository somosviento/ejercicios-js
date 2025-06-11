import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

// Redux actions and selectors
import {
  getOrders,
  changeOrderStatus,
  setFilters,
  setPage,
  setLimit,
  selectOrders,
  selectOrdersLoading,
  selectOrdersError,
  selectOrdersTotal,
  selectOrdersPage,
  selectOrdersLimit,
  selectOrdersTotalPages,
  selectOrdersFilters,
} from '../features/orders/ordersSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);
  const total = useSelector(selectOrdersTotal);
  const page = useSelector(selectOrdersPage);
  const limit = useSelector(selectOrdersLimit);
  const totalPages = useSelector(selectOrdersTotalPages);
  const filters = useSelector(selectOrdersFilters);
  
  // Local state
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  
  // Fetch orders on component mount and when filters/pagination change
  useEffect(() => {
    dispatch(getOrders({
      page,
      limit,
      ...filters,
    }));
  }, [dispatch, page, limit, filters]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
  };
  
  // Handle status filter change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    dispatch(setFilters({ status: e.target.value }));
  };
  
  // Handle sort menu
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };
  
  const handleSortClose = () => {
    setSortAnchorEl(null);
  };
  
  const handleSortSelect = (sort) => {
    dispatch(setFilters({ sort }));
    handleSortClose();
  };
  
  // Handle filter menu
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };
  
  // Handle action menu
  const handleActionClick = (event, orderId) => {
    setSelectedOrderId(orderId);
    setActionAnchorEl(event.currentTarget);
  };
  
  const handleActionClose = () => {
    setActionAnchorEl(null);
    setSelectedOrderId(null);
  };
  
  // Handle status change menu
  const handleStatusMenuClick = (event, orderId) => {
    setSelectedOrderId(orderId);
    setStatusAnchorEl(event.currentTarget);
  };
  
  const handleStatusMenuClose = () => {
    setStatusAnchorEl(null);
    setSelectedOrderId(null);
  };
  
  const handleStatusUpdate = async (status) => {
    await dispatch(changeOrderStatus({ id: selectedOrderId, status }));
    handleStatusMenuClose();
  };
  
  // Handle pagination
  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage + 1)); // API uses 1-indexed pages
  };
  
  const handleChangeRowsPerPage = (event) => {
    dispatch(setLimit(parseInt(event.target.value, 10)));
  };
  
  // Handle view order
  const handleViewOrder = (id) => {
    navigate(`/orders/${id}`);
    handleActionClose();
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // Get sort label
  const getSortLabel = () => {
    if (!filters.sort) return 'Sort';
    
    const [field, order] = filters.sort.split(':');
    const fieldLabels = {
      created_at: 'Date',
      total: 'Total',
      customer_name: 'Customer',
    };
    
    return `${fieldLabels[field] || field} (${order === 'asc' ? 'A-Z' : 'Z-A'})`;
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Orders
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Total Orders: {total}
          </Typography>
        </Box>
      </Box>
      
      {/* Error alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSearchSubmit}>
                <TextField
                  fullWidth
                  placeholder="Search orders by ID or customer name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button type="submit" variant="contained" size="small">
                          Search
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={statusFilter}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3} md={1.5}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={handleFilterClick}
              >
                Filter
              </Button>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
              >
                <MenuItem onClick={handleFilterClose}>Date Range</MenuItem>
                <MenuItem onClick={handleFilterClose}>Price Range</MenuItem>
                <MenuItem onClick={handleFilterClose}>Payment Method</MenuItem>
              </Menu>
            </Grid>
            <Grid item xs={6} sm={3} md={1.5}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<SortIcon />}
                onClick={handleSortClick}
              >
                {getSortLabel()}
              </Button>
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={handleSortClose}
              >
                <MenuItem onClick={() => handleSortSelect('created_at:desc')}>Date (Newest)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('created_at:asc')}>Date (Oldest)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('total:desc')}>Total (High to Low)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('total:asc')}>Total (Low to High)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('customer_name:asc')}>Customer (A-Z)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('customer_name:desc')}>Customer (Z-A)</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Orders table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && !orders.length ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    hover
                    key={order.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                    onClick={() => handleViewOrder(order.id)}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body2" fontWeight="medium">
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {order.customer_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(order.created_at)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="medium">
                        {formatCurrency(order.total)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                        onClick={(e) => handleStatusMenuClick(e, order.id)}
                        sx={{ textTransform: 'capitalize', minWidth: '90px' }}
                      />
                    </TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <Tooltip title="View Order">
                        <IconButton
                          size="small"
                          onClick={() => handleViewOrder(order.id)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Actions">
                        <IconButton
                          size="small"
                          onClick={(e) => handleActionClick(e, order.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={total}
          rowsPerPage={limit}
          page={page - 1} // API uses 1-indexed pages, MUI uses 0-indexed
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Action menu */}
      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={handleActionClose}
      >
        <MenuItem onClick={() => handleViewOrder(selectedOrderId)}>
          <Typography variant="body2">View Details</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleStatusMenuClick(actionAnchorEl, selectedOrderId)}>
          <Typography variant="body2">Update Status</Typography>
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <Typography variant="body2">Print Invoice</Typography>
        </MenuItem>
      </Menu>
      
      {/* Status change menu */}
      <Menu
        anchorEl={statusAnchorEl}
        open={Boolean(statusAnchorEl)}
        onClose={handleStatusMenuClose}
      >
        <MenuItem onClick={() => handleStatusUpdate('pending')}>
          <Chip 
            label="Pending" 
            color="warning" 
            size="small" 
            sx={{ minWidth: '90px' }} 
          />
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('processing')}>
          <Chip 
            label="Processing" 
            color="info" 
            size="small" 
            sx={{ minWidth: '90px' }} 
          />
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('shipped')}>
          <Chip 
            label="Shipped" 
            color="primary" 
            size="small" 
            sx={{ minWidth: '90px' }} 
          />
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('delivered')}>
          <Chip 
            label="Delivered" 
            color="success" 
            size="small" 
            sx={{ minWidth: '90px' }} 
          />
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('cancelled')}>
          <Chip 
            label="Cancelled" 
            color="error" 
            size="small" 
            sx={{ minWidth: '90px' }} 
          />
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Orders;

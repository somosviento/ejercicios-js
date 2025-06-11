import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
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
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

// Redux actions and selectors
import {
  getCustomers,
  setFilters,
  setPage,
  setLimit,
  selectCustomers,
  selectCustomersLoading,
  selectCustomersError,
  selectCustomersTotal,
  selectCustomersPage,
  selectCustomersLimit,
  selectCustomersTotalPages,
  selectCustomersFilters,
} from '../features/customers/customersSlice';

// Helper functions
import { stringToColor } from '../utils/helpers';

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const customers = useSelector(selectCustomers);
  const loading = useSelector(selectCustomersLoading);
  const error = useSelector(selectCustomersError);
  const total = useSelector(selectCustomersTotal);
  const page = useSelector(selectCustomersPage);
  const limit = useSelector(selectCustomersLimit);
  const totalPages = useSelector(selectCustomersTotalPages);
  const filters = useSelector(selectCustomersFilters);
  
  // Local state
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  
  // Fetch customers on component mount and when filters/pagination change
  useEffect(() => {
    dispatch(getCustomers({
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
  
  // Handle action menu
  const handleActionClick = (event, customerId) => {
    setSelectedCustomerId(customerId);
    setActionAnchorEl(event.currentTarget);
  };
  
  const handleActionClose = () => {
    setActionAnchorEl(null);
    setSelectedCustomerId(null);
  };
  
  // Handle pagination
  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage + 1)); // API uses 1-indexed pages
  };
  
  const handleChangeRowsPerPage = (event) => {
    dispatch(setLimit(parseInt(event.target.value, 10)));
  };
  
  // Handle view customer
  const handleViewCustomer = (id) => {
    navigate(`/customers/${id}`);
    handleActionClose();
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  // Generate avatar
  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
    };
  };
  
  // Get sort label
  const getSortLabel = () => {
    if (!filters.sort) return 'Sort';
    
    const [field, order] = filters.sort.split(':');
    const fieldLabels = {
      name: 'Name',
      email: 'Email',
      createdAt: 'Date Joined',
      totalSpent: 'Total Spent',
    };
    
    return `${fieldLabels[field] || field} (${order === 'asc' ? 'A-Z' : 'Z-A'})`;
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Customers
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Total Customers: {total}
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
            <Grid item xs={12} md={9}>
              <form onSubmit={handleSearchSubmit}>
                <TextField
                  fullWidth
                  placeholder="Search customers by name, email or phone..."
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
            <Grid item xs={12} md={3}>
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
                <MenuItem onClick={() => handleSortSelect('name:asc')}>Name (A-Z)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('name:desc')}>Name (Z-A)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('createdAt:desc')}>Date Joined (Newest)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('createdAt:asc')}>Date Joined (Oldest)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('totalSpent:desc')}>Total Spent (High to Low)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('totalSpent:asc')}>Total Spent (Low to High)</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Customers table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="customers table">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell align="right">Orders</TableCell>
                <TableCell align="right">Total Spent</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && !customers.length ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                    onClick={() => handleViewCustomer(customer.id)}
                  >
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar {...stringAvatar(customer.name)} sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {customer.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {customer.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary', fontSize: '0.875rem' }} />
                          <Typography variant="body2">{customer.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary', fontSize: '0.875rem' }} />
                          <Typography variant="body2">{customer.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(customer.createdAt)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {customer.orderCount}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="medium">
                        ${customer.totalSpent.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={customer.active ? 'Active' : 'Inactive'}
                        color={customer.active ? 'success' : 'default'}
                        size="small"
                        sx={{ minWidth: '80px' }}
                      />
                    </TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <Tooltip title="View Customer">
                        <IconButton
                          size="small"
                          onClick={() => handleViewCustomer(customer.id)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Actions">
                        <IconButton
                          size="small"
                          onClick={(e) => handleActionClick(e, customer.id)}
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
        <MenuItem onClick={() => handleViewCustomer(selectedCustomerId)}>
          <Typography variant="body2">View Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <Typography variant="body2">View Orders</Typography>
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <Typography variant="body2">Send Email</Typography>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Customers;

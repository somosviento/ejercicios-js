import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  LocalShipping as ShippingIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

// Redux actions and selectors
import {
  fetchOrderById,
  updateOrderStatus,
  selectOrderById,
  selectOrdersLoading,
  selectOrdersError,
} from '../features/orders/ordersSlice';

// Helpers
import { formatCurrency, formatDate, getStatusColor } from '../utils/helpers';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const order = useSelector((state) => selectOrderById(state, id));
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);
  
  // Local state
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  
  // Fetch order data on component mount
  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);
  
  // Handle status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatusUpdateLoading(true);
    
    dispatch(updateOrderStatus({ id, status: newStatus }))
      .unwrap()
      .then(() => {
        setStatusUpdateLoading(false);
      })
      .catch((err) => {
        console.error('Failed to update order status:', err);
        setStatusUpdateLoading(false);
      });
  };
  
  // Handle back navigation
  const handleBack = () => {
    navigate('/orders');
  };
  
  // Handle print invoice
  const handlePrintInvoice = () => {
    window.print();
  };
  
  // Handle send email
  const handleSendEmail = () => {
    // In a real app, this would open an email modal or trigger an API call
    alert(`Email sent to customer: ${order?.customer?.email}`);
  };
  
  // Calculate order summary
  const calculateOrderSummary = () => {
    if (!order || !order.items) return { subtotal: 0, tax: 0, shipping: 0, total: 0 };
    
    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // Assuming 10% tax
    const shipping = order.shippingCost || 0;
    const total = subtotal + tax + shipping;
    
    return { subtotal, tax, shipping, total };
  };
  
  const { subtotal, tax, shipping, total } = calculateOrderSummary();
  
  if (loading && !order) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">
          {error}
        </Alert>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Back to Orders
          </Button>
        </Box>
      </Container>
    );
  }
  
  if (!order) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning">
          Order not found
        </Alert>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Back to Orders
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          Dashboard
        </Link>
        <Link color="inherit" href="/orders" onClick={(e) => { e.preventDefault(); navigate('/orders'); }}>
          Orders
        </Link>
        <Typography color="text.primary">Order #{order.orderNumber}</Typography>
      </Breadcrumbs>
      
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleBack} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            Order #{order.orderNumber}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<EmailIcon />}
            onClick={handleSendEmail}
            sx={{ mr: 1 }}
          >
            Email
          </Button>
          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={handlePrintInvoice}
          >
            Print Invoice
          </Button>
        </Box>
      </Box>
      
      {/* Order status and date */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Order Date
                </Typography>
                <Typography variant="body1">
                  {formatDate(order.date)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ReceiptIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Amount
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {formatCurrency(total)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Customer
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/customers/${order.customer.id}`)}
                >
                  {order.customer.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Status
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={order.status}
                  onChange={handleStatusChange}
                  disabled={statusUpdateLoading}
                  sx={{
                    bgcolor: getStatusColor(order.status),
                    '& .MuiSelect-select': {
                      color: '#fff',
                      fontWeight: 'bold',
                    }
                  }}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
              {statusUpdateLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <CircularProgress size={20} />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Order content */}
      <Grid container spacing={3}>
        {/* Order items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: { xs: 3, md: 0 } }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            component="img"
                            src={item.imageUrl || 'https://via.placeholder.com/50x50'}
                            alt={item.name}
                            sx={{ width: 50, height: 50, mr: 2, objectFit: 'cover' }}
                          />
                          <Box>
                            <Typography variant="body1">
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              SKU: {item.sku || 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{formatCurrency(item.price * item.quantity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        {/* Order summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body1">Subtotal:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">{formatCurrency(subtotal)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">Tax:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">{formatCurrency(tax)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">Shipping:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">{formatCurrency(shipping)}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="h6">Total:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="right">{formatCurrency(total)}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          
          {/* Customer and Shipping Info */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Customer Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1">
                {order.customer.name}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">
                {order.customer.email}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="body1">
                {order.customer.phone || 'N/A'}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ShippingIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                Shipping Address
              </Typography>
            </Box>
            <Typography variant="body1">
              {order.shippingAddress?.street}
            </Typography>
            <Typography variant="body1">
              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
            </Typography>
            <Typography variant="body1">
              {order.shippingAddress?.country}
            </Typography>
            
            {order.trackingNumber && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Tracking Number
                </Typography>
                <Chip 
                  icon={<ShippingIcon />} 
                  label={order.trackingNumber} 
                  variant="outlined" 
                  color="primary"
                />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetail;

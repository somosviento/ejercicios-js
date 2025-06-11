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
  Avatar,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

// Redux actions and selectors
import {
  fetchCustomerById,
  fetchCustomerOrders,
  selectCustomerById,
  selectCustomerOrders,
  selectCustomersLoading,
  selectCustomersError,
} from '../features/customers/customersSlice';

// Helpers
import { formatCurrency, formatDate, getStatusColor, stringToColor, getInitials } from '../utils/helpers';

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`customer-tabpanel-${index}`}
      aria-labelledby={`customer-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Tab props
function a11yProps(index) {
  return {
    id: `customer-tab-${index}`,
    'aria-controls': `customer-tabpanel-${index}`,
  };
}

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const customer = useSelector((state) => selectCustomerById(state, id));
  const customerOrders = useSelector(selectCustomerOrders);
  const loading = useSelector(selectCustomersLoading);
  const error = useSelector(selectCustomersError);
  
  // Local state
  const [tabValue, setTabValue] = useState(0);
  
  // Fetch customer data on component mount
  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerById(id));
      dispatch(fetchCustomerOrders(id));
    }
  }, [dispatch, id]);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle back navigation
  const handleBack = () => {
    navigate('/customers');
  };
  
  // Handle send email
  const handleSendEmail = () => {
    // In a real app, this would open an email modal or trigger an API call
    alert(`Email sent to customer: ${customer?.email}`);
  };
  
  // Calculate customer stats
  const calculateCustomerStats = () => {
    if (!customerOrders || customerOrders.length === 0) {
      return {
        totalOrders: 0,
        totalSpent: 0,
        averageOrderValue: 0,
        lastOrderDate: null,
      };
    }
    
    const totalOrders = customerOrders.length;
    const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = totalSpent / totalOrders;
    const lastOrderDate = customerOrders.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date;
    
    return {
      totalOrders,
      totalSpent,
      averageOrderValue,
      lastOrderDate,
    };
  };
  
  const stats = calculateCustomerStats();
  
  if (loading && !customer) {
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
            Back to Customers
          </Button>
        </Box>
      </Container>
    );
  }
  
  if (!customer) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning">
          Customer not found
        </Alert>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Back to Customers
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
        <Link color="inherit" href="/customers" onClick={(e) => { e.preventDefault(); navigate('/customers'); }}>
          Customers
        </Link>
        <Typography color="text.primary">{customer.name}</Typography>
      </Breadcrumbs>
      
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleBack} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            Customer Profile
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            onClick={handleSendEmail}
          >
            Send Email
          </Button>
        </Box>
      </Box>
      
      {/* Customer profile */}
      <Grid container spacing={3}>
        {/* Customer info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  bgcolor: stringToColor(customer.name),
                  width: 100,
                  height: 100,
                  fontSize: '2.5rem',
                  mb: 2,
                }}
              >
                {getInitials(customer.name)}
              </Avatar>
              <Typography variant="h5" component="h2" align="center">
                {customer.name}
              </Typography>
              <Chip 
                label={customer.status === 'active' ? 'Active' : 'Inactive'} 
                color={customer.status === 'active' ? 'success' : 'default'}
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Email"
                  secondary={customer.email}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <PhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Phone"
                  secondary={customer.phone || 'Not provided'}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <LocationIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Location"
                  secondary={`${customer.address?.city || ''}, ${customer.address?.country || 'Not provided'}`}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <CalendarIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Customer Since"
                  secondary={formatDate(customer.createdAt)}
                />
              </ListItem>
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Customer Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Total Orders
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ShoppingCartIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        {stats.totalOrders}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Total Spent
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        {formatCurrency(stats.totalSpent)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Customer details tabs */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="customer tabs">
                <Tab label="Orders" icon={<ShoppingCartIcon />} iconPosition="start" {...a11yProps(0)} />
                <Tab label="Details" icon={<PersonIcon />} iconPosition="start" {...a11yProps(1)} />
              </Tabs>
            </Box>
            
            {/* Orders Tab */}
            <TabPanel value={tabValue} index={0}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : customerOrders && customerOrders.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Order #</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customerOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.orderNumber}</TableCell>
                          <TableCell>{formatDate(order.date)}</TableCell>
                          <TableCell>
                            <Chip 
                              label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} 
                              size="small"
                              sx={{ bgcolor: getStatusColor(order.status), color: '#fff' }}
                            />
                          </TableCell>
                          <TableCell align="right">{formatCurrency(order.total)}</TableCell>
                          <TableCell align="right">
                            <Button
                              size="small"
                              onClick={() => navigate(`/orders/${order.id}`)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No orders found for this customer.
                  </Typography>
                </Box>
              )}
            </TabPanel>
            
            {/* Details Tab */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1">
                      {customer.name}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {customer.email}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1">
                      {customer.phone || 'Not provided'}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Date of Birth
                    </Typography>
                    <Typography variant="body1">
                      {customer.dateOfBirth ? formatDate(customer.dateOfBirth) : 'Not provided'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    Address Information
                  </Typography>
                  {customer.address ? (
                    <>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Street Address
                        </Typography>
                        <Typography variant="body1">
                          {customer.address.street || 'Not provided'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          City
                        </Typography>
                        <Typography variant="body1">
                          {customer.address.city || 'Not provided'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          State/Province
                        </Typography>
                        <Typography variant="body1">
                          {customer.address.state || 'Not provided'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Zip/Postal Code
                        </Typography>
                        <Typography variant="body1">
                          {customer.address.zip || 'Not provided'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Country
                        </Typography>
                        <Typography variant="body1">
                          {customer.address.country || 'Not provided'}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      No address information available.
                    </Typography>
                  )}
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Additional Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Customer Since
                        </Typography>
                        <Typography variant="body1">
                          {formatDate(customer.createdAt)}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Last Order Date
                        </Typography>
                        <Typography variant="body1">
                          {stats.lastOrderDate ? formatDate(stats.lastOrderDate) : 'No orders yet'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Status
                        </Typography>
                        <Chip 
                          label={customer.status === 'active' ? 'Active' : 'Inactive'} 
                          color={customer.status === 'active' ? 'success' : 'default'}
                        />
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Average Order Value
                        </Typography>
                        <Typography variant="body1">
                          {stats.averageOrderValue ? formatCurrency(stats.averageOrderValue) : '$0.00'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerDetail;

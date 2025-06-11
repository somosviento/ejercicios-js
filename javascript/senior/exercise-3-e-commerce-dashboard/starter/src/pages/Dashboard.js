import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

// Charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Redux actions and selectors
import {
  getDashboardStats,
  selectDashboardStats,
  selectDashboardLoading,
  selectDashboardError,
  selectDashboardLastUpdated,
} from '../features/dashboard/dashboardSlice';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatIconWrapper = styled(Box)(({ theme, color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 60,
  width: 60,
  borderRadius: '50%',
  backgroundColor: theme.palette[color].light,
  color: theme.palette[color].main,
  marginBottom: theme.spacing(2),
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stats = useSelector(selectDashboardStats);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);
  const lastUpdated = useSelector(selectDashboardLastUpdated);

  // Fetch dashboard stats on component mount
  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  // Handle refresh button click
  const handleRefresh = () => {
    dispatch(getDashboardStats());
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Prepare chart data
  const revenueChartData = {
    labels: stats.revenueByDay?.map(item => item.date) || [],
    datasets: [
      {
        label: 'Revenue',
        data: stats.revenueByDay?.map(item => item.revenue) || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Daily Revenue (Last 7 Days)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Order status chart data
  const orderStatusLabels = Object.keys(stats.orderStatusDistribution || {});
  const orderStatusData = Object.values(stats.orderStatusDistribution || {});
  const orderStatusColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
  ];

  const orderStatusChartData = {
    labels: orderStatusLabels,
    datasets: [
      {
        data: orderStatusData,
        backgroundColor: orderStatusColors,
        borderWidth: 1,
      },
    ],
  };

  const orderStatusChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Order Status Distribution',
      },
    },
    maintainAspectRatio: false,
  };

  // Top selling products chart data
  const topProductsChartData = {
    labels: stats.topSellingProducts?.map(product => product.name) || [],
    datasets: [
      {
        label: 'Sales',
        data: stats.topSellingProducts?.map(product => product.sales) || [],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
    ],
  };

  const topProductsChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top Selling Products',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  // Get status color for order chips
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

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading && !stats.totalOrders) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header with refresh button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {lastUpdated && (
            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
              Last updated: {formatDate(lastUpdated)}
            </Typography>
          )}
          <Tooltip title="Refresh data">
            <IconButton onClick={handleRefresh} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : <RefreshIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Error alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <StatIconWrapper color="primary">
                <AttachMoneyIcon fontSize="large" />
              </StatIconWrapper>
              <Typography variant="h5" component="div">
                {formatCurrency(stats.totalRevenue)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Revenue
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <StatIconWrapper color="secondary">
                <ShoppingCartIcon fontSize="large" />
              </StatIconWrapper>
              <Typography variant="h5" component="div">
                {stats.totalOrders}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Orders
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <StatIconWrapper color="success">
                <InventoryIcon fontSize="large" />
              </StatIconWrapper>
              <Typography variant="h5" component="div">
                {stats.totalProducts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Products
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <StatIconWrapper color="info">
                <PeopleIcon fontSize="large" />
              </StatIconWrapper>
              <Typography variant="h5" component="div">
                {stats.totalCustomers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Customers
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardHeader 
              title="Revenue Overview" 
              action={
                <IconButton aria-label="view more" onClick={() => navigate('/analytics')}>
                  <ArrowForwardIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 300 }}>
              <Line data={revenueChartData} options={revenueChartOptions} />
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Order Status Chart */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardHeader 
              title="Order Status" 
              action={
                <IconButton aria-label="view more" onClick={() => navigate('/orders')}>
                  <ArrowForwardIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <Doughnut data={orderStatusChartData} options={orderStatusChartOptions} />
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Top Products Chart */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeader 
              title="Top Selling Products" 
              action={
                <IconButton aria-label="view more" onClick={() => navigate('/products')}>
                  <ArrowForwardIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 300 }}>
              <Bar data={topProductsChartData} options={topProductsChartOptions} />
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeader 
              title="Recent Orders" 
              action={
                <IconButton aria-label="view more" onClick={() => navigate('/orders')}>
                  <ArrowForwardIcon />
                </IconButton>
              }
            />
            <Divider />
            <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto', maxHeight: 300 }}>
              {stats.recentOrders?.map((order) => (
                <React.Fragment key={order.id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <Chip 
                        label={order.status} 
                        color={getStatusColor(order.status)} 
                        size="small" 
                      />
                    }
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        {order.customer_name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Order #${order.id}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {order.customer_name}
                          </Typography>
                          {` — ${formatCurrency(order.total)}`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
              {(!stats.recentOrders || stats.recentOrders.length === 0) && (
                <ListItem>
                  <ListItemText primary="No recent orders" />
                </ListItem>
              )}
            </List>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

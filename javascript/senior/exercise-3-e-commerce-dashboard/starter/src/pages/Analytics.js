import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  CircularProgress,
  Alert,
} from '@mui/material';

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
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';

// Redux actions and selectors
import { getDashboardStats, selectDashboardStats, selectDashboardLoading, selectDashboardError } from '../features/dashboard/dashboardSlice';

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

const Analytics = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectDashboardStats);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);
  
  // Local state
  const [timeRange, setTimeRange] = useState('7days');
  const [revenueChartType, setRevenueChartType] = useState('line');
  
  // Fetch dashboard stats on component mount
  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);
  
  // Handle time range change
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
    // In a real app, we would dispatch an action to fetch data for the selected time range
  };
  
  // Handle chart type change
  const handleRevenueChartTypeChange = (type) => {
    setRevenueChartType(type);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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
        text: 'Revenue Over Time',
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
  
  // Customer acquisition chart data (mock data)
  const customerAcquisitionData = {
    labels: ['Direct', 'Organic Search', 'Referral', 'Social Media', 'Email', 'Paid Ads'],
    datasets: [
      {
        data: [30, 25, 15, 12, 10, 8],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const customerAcquisitionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Customer Acquisition Channels',
      },
    },
    maintainAspectRatio: false,
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
      {/* Header with filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Analytics
        </Typography>
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel id="time-range-label">Time Range</InputLabel>
          <Select
            labelId="time-range-label"
            id="time-range"
            value={timeRange}
            onChange={handleTimeRangeChange}
            label="Time Range"
          >
            <MenuItem value="7days">Last 7 Days</MenuItem>
            <MenuItem value="30days">Last 30 Days</MenuItem>
            <MenuItem value="90days">Last 90 Days</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
            <MenuItem value="all">All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Error alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {/* Summary cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4" component="div">
                {formatCurrency(stats.totalRevenue)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {timeRange === '7days' ? 'Last 7 Days' : 
                 timeRange === '30days' ? 'Last 30 Days' : 
                 timeRange === '90days' ? 'Last 90 Days' : 
                 timeRange === 'year' ? 'This Year' : 'All Time'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Orders
              </Typography>
              <Typography variant="h4" component="div">
                {stats.totalOrders}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg. {(stats.totalRevenue / (stats.totalOrders || 1)).toFixed(2)} per order
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Conversion Rate
              </Typography>
              <Typography variant="h4" component="div">
                2.4%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +0.5% from last period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Avg. Order Value
              </Typography>
              <Typography variant="h4" component="div">
                {formatCurrency(stats.totalRevenue / (stats.totalOrders || 1))}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                -2.1% from last period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Revenue Over Time
              </Typography>
              <ButtonGroup variant="outlined" size="small">
                <Button 
                  onClick={() => handleRevenueChartTypeChange('line')}
                  variant={revenueChartType === 'line' ? 'contained' : 'outlined'}
                >
                  Line
                </Button>
                <Button 
                  onClick={() => handleRevenueChartTypeChange('bar')}
                  variant={revenueChartType === 'bar' ? 'contained' : 'outlined'}
                >
                  Bar
                </Button>
              </ButtonGroup>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: 350 }}>
              {revenueChartType === 'line' ? (
                <Line data={revenueChartData} options={revenueChartOptions} />
              ) : (
                <Bar data={revenueChartData} options={revenueChartOptions} />
              )}
            </Box>
          </Paper>
        </Grid>
        
        {/* Order Status and Top Products */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Order Status Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <Doughnut data={orderStatusChartData} options={orderStatusChartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Top Selling Products
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: 300 }}>
              <Bar data={topProductsChartData} options={topProductsChartOptions} />
            </Box>
          </Paper>
        </Grid>
        
        {/* Customer Acquisition and Sales by Category */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Customer Acquisition Channels
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <Pie data={customerAcquisitionData} options={customerAcquisitionOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Sales by Category
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: 300 }}>
              {/* Mock data for sales by category */}
              <Bar 
                data={{
                  labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys'],
                  datasets: [
                    {
                      label: 'Sales',
                      data: [12500, 9800, 7600, 4200, 3100],
                      backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: false,
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
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;

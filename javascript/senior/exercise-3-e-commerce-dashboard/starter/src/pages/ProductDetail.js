import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';

// Redux actions and selectors
import {
  fetchProductById,
  updateProduct,
  deleteProduct,
  selectProductById,
  selectProductsLoading,
  selectProductsError,
} from '../features/products/productsSlice';

// Helpers
import { formatCurrency } from '../utils/helpers';

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Tab props
function a11yProps(index) {
  return {
    id: `product-tab-${index}`,
    'aria-controls': `product-tabpanel-${index}`,
  };
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const product = useSelector((state) => selectProductById(state, id));
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  
  // Local state
  const [editMode, setEditMode] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
    sku: '',
    weight: '',
    dimensions: '',
    manufacturer: '',
    featured: false,
  });
  
  // Fetch product data on component mount
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);
  
  // Update form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        stock: product.stock || '',
        imageUrl: product.imageUrl || '',
        sku: product.sku || '',
        weight: product.weight || '',
        dimensions: product.dimensions || '',
        manufacturer: product.manufacturer || '',
        featured: product.featured || false,
      });
    }
  }, [product]);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  // Handle edit mode toggle
  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (editMode) {
      // Reset form data when canceling edit
      if (product) {
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          category: product.category || '',
          stock: product.stock || '',
          imageUrl: product.imageUrl || '',
          sku: product.sku || '',
          weight: product.weight || '',
          dimensions: product.dimensions || '',
          manufacturer: product.manufacturer || '',
          featured: product.featured || false,
        });
      }
    }
  };
  
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedProduct = {
      id: product.id,
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    };
    
    dispatch(updateProduct(updatedProduct))
      .unwrap()
      .then(() => {
        setEditMode(false);
      })
      .catch((err) => {
        console.error('Failed to update product:', err);
      });
  };
  
  // Handle delete dialog
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };
  
  // Handle product delete
  const handleDeleteProduct = () => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        navigate('/products');
      })
      .catch((err) => {
        console.error('Failed to delete product:', err);
      });
  };
  
  // Handle back navigation
  const handleBack = () => {
    navigate('/products');
  };
  
  if (loading && !product) {
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
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }
  
  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning">
          Product not found
        </Alert>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Back to Products
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
        <Link color="inherit" href="/products" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>
          Products
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>
      
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleBack} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            {editMode ? 'Edit Product' : product.name}
          </Typography>
        </Box>
        <Box>
          {editMode ? (
            <>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={handleEditToggle}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEditToggle}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteDialogOpen}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      </Box>
      
      {/* Product content */}
      <Grid container spacing={3}>
        {/* Product image */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={product.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'}
              alt={product.name}
            />
            {editMode && (
              <CardContent>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                  size="small"
                />
              </CardContent>
            )}
          </Card>
        </Grid>
        
        {/* Product details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="product tabs">
                <Tab label="Basic Info" {...a11yProps(0)} />
                <Tab label="Details" {...a11yProps(1)} />
                <Tab label="Inventory" {...a11yProps(2)} />
              </Tabs>
            </Box>
            
            {/* Basic Info Tab */}
            <TabPanel value={tabValue} index={0}>
              {editMode ? (
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Product Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: <AttachMoneyIcon />,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                </form>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CategoryIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1" color="text.secondary">
                        Category:
                      </Typography>
                      <Chip 
                        label={product.category} 
                        size="small" 
                        sx={{ ml: 1 }} 
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AttachMoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1" color="text.secondary">
                        Price:
                      </Typography>
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {formatCurrency(product.price)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <InventoryIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1" color="text.secondary">
                        Stock:
                      </Typography>
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {product.stock} units
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1" color="text.secondary">
                        Description:
                      </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                      {product.description || 'No description available.'}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </TabPanel>
            
            {/* Details Tab */}
            <TabPanel value={tabValue} index={1}>
              {editMode ? (
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="SKU"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Manufacturer"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Dimensions"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleInputChange}
                        placeholder="e.g., 10 x 5 x 3 inches"
                      />
                    </Grid>
                  </Grid>
                </form>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      SKU
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {product.sku || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Manufacturer
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {product.manufacturer || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Weight
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {product.weight || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Dimensions
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {product.dimensions || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </TabPanel>
            
            {/* Inventory Tab */}
            <TabPanel value={tabValue} index={2}>
              {editMode ? (
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                  </Grid>
                </form>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <InventoryIcon sx={{ mr: 1, fontSize: '2rem', color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="h6">
                          Current Stock: {product.stock} units
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Stock status indicator */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Stock Status
                      </Typography>
                      <Box
                        sx={{
                          width: '100%',
                          height: 10,
                          bgcolor: 'grey.300',
                          borderRadius: 5,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            width: `${Math.min(product.stock * 2, 100)}%`,
                            height: '100%',
                            bgcolor: product.stock > 10 ? 'success.main' : product.stock > 0 ? 'warning.main' : 'error.main',
                          }}
                        />
                      </Box>
                    </Box>
                    
                    {/* Stock management tips */}
                    {product.stock <= 10 && (
                      <Alert severity={product.stock === 0 ? 'error' : 'warning'} sx={{ mb: 2 }}>
                        {product.stock === 0 
                          ? 'This product is out of stock. Consider ordering more inventory.' 
                          : 'This product is running low on stock. Consider restocking soon.'}
                      </Alert>
                    )}
                  </Grid>
                </Grid>
              )}
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Product
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{product.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductDetail;

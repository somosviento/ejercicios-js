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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

// Redux actions and selectors
import {
  getProducts,
  removeProduct,
  setFilters,
  setPage,
  setLimit,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectProductsTotal,
  selectProductsPage,
  selectProductsLimit,
  selectProductsTotalPages,
  selectProductsFilters,
} from '../features/products/productsSlice';

// Components
import { openModal } from '../features/ui/uiSlice';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const total = useSelector(selectProductsTotal);
  const page = useSelector(selectProductsPage);
  const limit = useSelector(selectProductsLimit);
  const totalPages = useSelector(selectProductsTotalPages);
  const filters = useSelector(selectProductsFilters);
  
  // Local state
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [categoryFilter, setCategoryFilter] = useState(filters.category || '');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  
  // Fetch products on component mount and when filters/pagination change
  useEffect(() => {
    dispatch(getProducts({
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
  
  // Handle category filter change
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    dispatch(setFilters({ category: e.target.value }));
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
  const handleActionClick = (event, productId) => {
    setSelectedProductId(productId);
    setActionAnchorEl(event.currentTarget);
  };
  
  const handleActionClose = () => {
    setActionAnchorEl(null);
    setSelectedProductId(null);
  };
  
  // Handle pagination
  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage + 1)); // API uses 1-indexed pages
  };
  
  const handleChangeRowsPerPage = (event) => {
    dispatch(setLimit(parseInt(event.target.value, 10)));
  };
  
  // Handle product actions
  const handleViewProduct = (id) => {
    navigate(`/products/${id}`);
    handleActionClose();
  };
  
  const handleEditProduct = (id) => {
    navigate(`/products/${id}/edit`);
    handleActionClose();
  };
  
  const handleDeleteClick = (id) => {
    setDeleteProductId(id);
    setDeleteDialogOpen(true);
    handleActionClose();
  };
  
  const handleDeleteConfirm = async () => {
    await dispatch(removeProduct(deleteProductId));
    setDeleteDialogOpen(false);
    setDeleteProductId(null);
  };
  
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteProductId(null);
  };
  
  // Handle add new product
  const handleAddProduct = () => {
    dispatch(openModal({ modalType: 'productForm', modalData: null }));
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Get sort label
  const getSortLabel = () => {
    if (!filters.sort) return 'Sort';
    
    const [field, order] = filters.sort.split(':');
    const fieldLabels = {
      name: 'Name',
      price: 'Price',
      inventory: 'Inventory',
      createdAt: 'Date Created',
    };
    
    return `${fieldLabels[field] || field} (${order === 'asc' ? 'A-Z' : 'Z-A'})`;
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
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
                  placeholder="Search products..."
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
                <InputLabel id="category-filter-label">Category</InputLabel>
                <Select
                  labelId="category-filter-label"
                  id="category-filter"
                  value={categoryFilter}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Clothing">Clothing</MenuItem>
                  <MenuItem value="Home & Kitchen">Home & Kitchen</MenuItem>
                  <MenuItem value="Books">Books</MenuItem>
                  <MenuItem value="Toys">Toys</MenuItem>
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
                <MenuItem onClick={handleFilterClose}>Price Range</MenuItem>
                <MenuItem onClick={handleFilterClose}>Inventory</MenuItem>
                <MenuItem onClick={handleFilterClose}>Rating</MenuItem>
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
                <MenuItem onClick={() => handleSortSelect('name:asc')}>Name (A-Z)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('name:desc')}>Name (Z-A)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('price:asc')}>Price (Low to High)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('price:desc')}>Price (High to Low)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('inventory:asc')}>Inventory (Low to High)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('inventory:desc')}>Inventory (High to Low)</MenuItem>
                <MenuItem onClick={() => handleSortSelect('createdAt:desc')}>Newest First</MenuItem>
                <MenuItem onClick={() => handleSortSelect('createdAt:asc')}>Oldest First</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Products table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Inventory</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && !products.length ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow
                    hover
                    key={product.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          sx={{
                            height: 40,
                            width: 40,
                            mr: 2,
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                          alt={product.name}
                          src={product.image || 'https://via.placeholder.com/40'}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/40';
                          }}
                        />
                        <Typography variant="body2">{product.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{ borderRadius: 1 }}
                      />
                    </TableCell>
                    <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        color={product.inventory < 10 ? 'error' : 'textPrimary'}
                      >
                        {product.inventory}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={product.rating}
                        size="small"
                        color={
                          product.rating >= 4.5 ? 'success' :
                          product.rating >= 3.5 ? 'primary' :
                          product.rating >= 2.5 ? 'warning' : 'error'
                        }
                      />
                    </TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <Tooltip title="Actions">
                        <IconButton
                          size="small"
                          onClick={(e) => handleActionClick(e, product.id)}
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
        <MenuItem onClick={() => handleViewProduct(selectedProductId)}>
          <Typography variant="body2">View Details</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleEditProduct(selectedProductId)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleDeleteClick(selectedProductId)} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </Menu>
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Products;

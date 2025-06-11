import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  InputAdornment,
  Chip,
  Alert,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Book as BookIcon,
  VideoLibrary as VideoLibraryIcon,
  ContactSupport as ContactSupportIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle category filter change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  // Handle contact form submit
  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    // In a real app, dispatch an action to submit the form
    setContactFormSubmitted(true);
    setTimeout(() => {
      setContactFormSubmitted(false);
    }, 5000);
  };
  
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'How do I add a new product?',
      answer: 'To add a new product, navigate to the Products page and click the "Add Product" button in the top right corner. Fill out the product details form and click "Save" to create the new product.',
      category: 'products',
    },
    {
      id: 2,
      question: 'How do I update an order status?',
      answer: 'To update an order status, go to the Orders page, find the order you want to update, and click on the status chip. A dropdown menu will appear with available status options. Select the new status and it will be updated immediately.',
      category: 'orders',
    },
    {
      id: 3,
      question: 'How do I view customer details?',
      answer: 'To view customer details, navigate to the Customers page and click on the customer name or the "View" button for the customer you want to see. This will take you to the customer details page with all their information and order history.',
      category: 'customers',
    },
    {
      id: 4,
      question: 'How do I export reports?',
      answer: 'To export reports, go to the Analytics page and use the export buttons available for each chart or table. You can export data in various formats including CSV, Excel, and PDF.',
      category: 'analytics',
    },
    {
      id: 5,
      question: 'How do I change my password?',
      answer: 'To change your password, go to the Settings page and select the "Security" tab. Enter your current password and your new password twice, then click "Change Password" to update it.',
      category: 'account',
    },
    {
      id: 6,
      question: 'How do I enable dark mode?',
      answer: 'To enable dark mode, click on your profile icon in the top right corner and select "Dark Mode" from the dropdown menu. Alternatively, you can go to Settings > Appearance and toggle the dark mode switch.',
      category: 'account',
    },
    {
      id: 7,
      question: 'How do I filter products by category?',
      answer: 'To filter products by category, go to the Products page and use the category dropdown in the filters section. Select the desired category and the product list will update automatically.',
      category: 'products',
    },
    {
      id: 8,
      question: 'How do I search for a specific order?',
      answer: 'To search for a specific order, go to the Orders page and use the search bar at the top. You can search by order ID, customer name, or product name. Enter your search term and press Enter or click the search button.',
      category: 'orders',
    },
  ];
  
  // Filter FAQs based on search term and category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Category counts
  const categoryCounts = {
    all: faqs.length,
    products: faqs.filter(faq => faq.category === 'products').length,
    orders: faqs.filter(faq => faq.category === 'orders').length,
    customers: faqs.filter(faq => faq.category === 'customers').length,
    analytics: faqs.filter(faq => faq.category === 'analytics').length,
    account: faqs.filter(faq => faq.category === 'account').length,
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Help Center
      </Typography>
      
      {/* Search bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search for help topics..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <List component="nav" dense>
              <ListItem 
                button 
                selected={activeCategory === 'all'}
                onClick={() => handleCategoryChange('all')}
              >
                <ListItemText primary="All Topics" />
                <Chip 
                  label={categoryCounts.all} 
                  size="small" 
                  color={activeCategory === 'all' ? 'primary' : 'default'}
                />
              </ListItem>
              <ListItem 
                button 
                selected={activeCategory === 'products'}
                onClick={() => handleCategoryChange('products')}
              >
                <ListItemText primary="Products" />
                <Chip 
                  label={categoryCounts.products} 
                  size="small" 
                  color={activeCategory === 'products' ? 'primary' : 'default'}
                />
              </ListItem>
              <ListItem 
                button 
                selected={activeCategory === 'orders'}
                onClick={() => handleCategoryChange('orders')}
              >
                <ListItemText primary="Orders" />
                <Chip 
                  label={categoryCounts.orders} 
                  size="small" 
                  color={activeCategory === 'orders' ? 'primary' : 'default'}
                />
              </ListItem>
              <ListItem 
                button 
                selected={activeCategory === 'customers'}
                onClick={() => handleCategoryChange('customers')}
              >
                <ListItemText primary="Customers" />
                <Chip 
                  label={categoryCounts.customers} 
                  size="small" 
                  color={activeCategory === 'customers' ? 'primary' : 'default'}
                />
              </ListItem>
              <ListItem 
                button 
                selected={activeCategory === 'analytics'}
                onClick={() => handleCategoryChange('analytics')}
              >
                <ListItemText primary="Analytics" />
                <Chip 
                  label={categoryCounts.analytics} 
                  size="small" 
                  color={activeCategory === 'analytics' ? 'primary' : 'default'}
                />
              </ListItem>
              <ListItem 
                button 
                selected={activeCategory === 'account'}
                onClick={() => handleCategoryChange('account')}
              >
                <ListItemText primary="Account & Settings" />
                <Chip 
                  label={categoryCounts.account} 
                  size="small" 
                  color={activeCategory === 'account' ? 'primary' : 'default'}
                />
              </ListItem>
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <List component="nav" dense>
              <ListItem button>
                <ListItemIcon>
                  <BookIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Documentation" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <VideoLibraryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Video Tutorials" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <QuestionAnswerIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Community Forum" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Main content */}
        <Grid item xs={12} md={9}>
          {/* FAQ section */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Frequently Asked Questions
              {activeCategory !== 'all' && (
                <Chip 
                  label={activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} 
                  color="primary" 
                  size="small" 
                  sx={{ ml: 1 }}
                />
              )}
            </Typography>
            
            {filteredFaqs.length === 0 ? (
              <Box sx={{ py: 2 }}>
                <Typography variant="body1" color="text.secondary" align="center">
                  No results found for "{searchTerm}". Try a different search term or browse the categories.
                </Typography>
              </Box>
            ) : (
              filteredFaqs.map((faq) => (
                <Accordion key={faq.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`faq-${faq.id}-content`}
                    id={`faq-${faq.id}-header`}
                  >
                    <Typography variant="subtitle1">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </Paper>
          
          {/* Contact support section */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Still Need Help? Contact Support
            </Typography>
            
            {contactFormSubmitted && (
              <Alert 
                severity="success" 
                icon={<CheckCircleIcon fontSize="inherit" />}
                sx={{ mb: 2 }}
              >
                Your message has been sent! Our support team will get back to you within 24 hours.
              </Alert>
            )}
            
            <form onSubmit={handleContactFormSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    required
                    multiline
                    rows={4}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<ContactSupportIcon />}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Help;

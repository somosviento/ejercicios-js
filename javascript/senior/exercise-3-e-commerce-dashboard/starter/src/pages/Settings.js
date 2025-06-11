import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  AccountCircle,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

// Redux actions
import { toggleDarkMode } from '../features/ui/uiSlice';

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Tab props
function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const Settings = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);
  const user = useSelector((state) => state.auth.user);
  
  // Local state
  const [tabValue, setTabValue] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };
  
  // Handle notification toggles
  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };
  
  const handleEmailNotificationsToggle = () => {
    setEmailNotifications(!emailNotifications);
  };
  
  const handlePushNotificationsToggle = () => {
    setPushNotifications(!pushNotifications);
  };
  
  // Handle language change
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  
  // Handle profile form change
  const handleProfileFormChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };
  
  // Handle form submit
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, dispatch an action to update the user profile
    setSnackbarMessage('Profile updated successfully!');
    setSnackbarOpen(true);
  };
  
  // Handle password change
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // In a real app, dispatch an action to change the password
    setSnackbarMessage('Password changed successfully!');
    setSnackbarOpen(true);
  };
  
  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<AccountCircle />} label="Profile" {...a11yProps(0)} />
          <Tab icon={<NotificationsIcon />} label="Notifications" {...a11yProps(1)} />
          <Tab icon={<SecurityIcon />} label="Security" {...a11yProps(2)} />
          <Tab icon={<PaletteIcon />} label="Appearance" {...a11yProps(3)} />
          <Tab icon={<LanguageIcon />} label="Language" {...a11yProps(4)} />
        </Tabs>
        
        {/* Profile Tab */}
        <TabPanel value={tabValue} index={0}>
          <form onSubmit={handleProfileSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileFormChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={profileForm.email}
                  onChange={handleProfileFormChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileFormChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={profileForm.bio}
                  onChange={handleProfileFormChange}
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
        
        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={1}>
          <List>
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Enable Notifications"
                secondary="Allow the application to send you notifications"
              />
              <Switch
                edge="end"
                checked={notificationsEnabled}
                onChange={handleNotificationsToggle}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Email Notifications"
                secondary="Receive notifications via email"
                inset
              />
              <Switch
                edge="end"
                checked={emailNotifications}
                onChange={handleEmailNotificationsToggle}
                disabled={!notificationsEnabled}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Push Notifications"
                secondary="Receive push notifications in your browser"
                inset
              />
              <Switch
                edge="end"
                checked={pushNotifications}
                onChange={handlePushNotificationsToggle}
                disabled={!notificationsEnabled}
              />
            </ListItem>
          </List>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => {
                setSnackbarMessage('Notification settings saved!');
                setSnackbarOpen(true);
              }}
            >
              Save Preferences
            </Button>
          </Box>
        </TabPanel>
        
        {/* Security Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <form onSubmit={handlePasswordSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  required
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  required
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 2, bgcolor: 'background.default' }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Password Requirements
                    </Typography>
                    <Typography variant="body2" component="div">
                      <ul>
                        <li>At least 8 characters long</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one lowercase letter</li>
                        <li>At least one number</li>
                        <li>At least one special character</li>
                      </ul>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Change Password
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
        
        {/* Appearance Tab */}
        <TabPanel value={tabValue} index={3}>
          <List>
            <ListItem>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dark Mode"
                secondary="Toggle between light and dark theme"
              />
              <Switch
                edge="end"
                checked={darkMode}
                onChange={handleDarkModeToggle}
              />
            </ListItem>
          </List>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => {
                setSnackbarMessage('Appearance settings saved!');
                setSnackbarOpen(true);
              }}
            >
              Save Preferences
            </Button>
          </Box>
        </TabPanel>
        
        {/* Language Tab */}
        <TabPanel value={tabValue} index={4}>
          <FormControl component="fieldset">
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Language"
                    value={language}
                    onChange={handleLanguageChange}
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </TextField>
                </Grid>
              </Grid>
            </FormGroup>
          </FormControl>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => {
                setSnackbarMessage('Language settings saved!');
                setSnackbarOpen(true);
              }}
            >
              Save Preferences
            </Button>
          </Box>
        </TabPanel>
      </Paper>
      
      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default Settings;

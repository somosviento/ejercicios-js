import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

// Layout components
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

// Redux actions
import { toggleSidebar } from '../../features/ui/uiSlice';

// Constants
const DRAWER_WIDTH = 240;

// Styled components
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${DRAWER_WIDTH}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
  }),
);

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);
  
  // Handle sidebar toggle
  const handleDrawerToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Top navigation bar */}
      <Header 
        drawerWidth={DRAWER_WIDTH} 
        open={sidebarOpen} 
        handleDrawerToggle={handleDrawerToggle} 
      />
      
      {/* Sidebar navigation */}
      <Sidebar 
        drawerWidth={DRAWER_WIDTH} 
        open={sidebarOpen} 
        handleDrawerToggle={handleDrawerToggle} 
      />
      
      {/* Main content area */}
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Main open={sidebarOpen}>
          <Box sx={{ pt: 8, pb: 2, px: { xs: 2, sm: 3 } }}>
            {/* Page content from nested routes */}
            <Outlet />
          </Box>
        </Main>
        
        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default DashboardLayout;

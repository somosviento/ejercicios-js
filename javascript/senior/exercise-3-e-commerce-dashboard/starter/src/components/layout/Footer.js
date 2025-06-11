import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Typography variant="body2" color="text.secondary" align="center">
              {'© '}
              <Link color="inherit" href="#">
                E-Commerce Dashboard
              </Link>{' '}
              {new Date().getFullYear()}
              {'. All rights reserved.'}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
            }}
          >
            <Link href="#" color="text.secondary" underline="hover">
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              Terms of Service
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              Contact
            </Link>
          </Box>
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{ mt: 1, display: 'block' }}
        >
          Version 1.0.0
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

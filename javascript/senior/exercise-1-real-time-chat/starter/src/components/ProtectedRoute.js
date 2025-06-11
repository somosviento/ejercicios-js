import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Protected route component that redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
